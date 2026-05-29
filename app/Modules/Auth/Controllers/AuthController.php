<?php

namespace App\Modules\Auth\Controllers;

use App\Helpers\ResponseHelper;
use App\Modules\Auth\Services\AuthService;
use App\Modules\Auth\Models\AuthValidation;
use App\Modules\User\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller
{
    private AuthService $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
        $this->setupMiddleware();
    }

    private function setupMiddleware(): void
    {
        $guestOnly = [
            'showLogin',
            'signIn',
            'showSecureLogin',
            'secureLogin',
            'showForgetPassword',
            'forgetPassword',
            'showResetMpin',
            'resetMpin',
            'resendOtp',
            'getMobile',
            'getUserId',
            'showDailyLogin',
            'checkLoginMode',
            'requestDailyPassword',
            'loginWithDailyPassword',
        ];

        $authOnly = [
            'logout',
            'changePassword',
            'changeMPin',
            'changeTwoFa',
            'dashboard',
            'showChangePassword',
            'showChangeMPin',
            'showTwoFactorSettings',
            'getProfileData',
            'changeUserLoginMethod'
        ];

        $this->middleware('guest')->only($guestOnly);
        $this->middleware('auth')->only($authOnly);
        $this->middleware('check.active')->except($guestOnly);
    }

    private function isApiRequest(Request $request): bool
    {
        return $request->wantsJson() || $request->is('api/*');
    }

    private function isGuruUser($username): bool
    {
        return stripos($username, 'GURU') === 0;
    }

    /* ---------------- LOGIN PAGES ---------------- */

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function showSecureLogin(Request $request)
    {
        $userId = $request->get('user_id') ?? session('two_factor_user_id');

        if (!$userId) {
            return redirect()->route('auth.login.page');
        }

        $user = User::find($userId);

        return Inertia::render('Auth/SecureLogin', [
            'user_id' => $userId,
            'otp_ref' => session('otp_ref'),
            'two_fa_type' => $request->get('two_fa_type'),
            'mobile' => $user?->mobile,
            'role' => $user?->role,
        ]);
    }

    public function dashboard()
    {
        return Inertia::render('Dashboard/Dashboard', [
            'user' => Auth::user(),
        ]);
    }

    /* ---------------- SIGN IN ---------------- */

    public function signIn(Request $request)
    {
        $validator = AuthValidation::signIn($request->all());
        if ($validator->fails()) {
            return $this->errorResponse($request, $validator->errors());
        }

        if (!$this->isGuruUser($request->username)) {
            return $this->errorResponse($request, ['error' => 'Only Guru users allowed']);
        }

        $user = $this->auth->getUserFromUsername($request->username);

        if (!$user) {
            return $this->errorResponse($request, ['username' => 'User not found']);
        }

        if (!$this->auth->verifyPassword($user, $request->password)) {
            return $this->errorResponse($request, ['password' => 'Wrong password']);
        }

        if (!$this->auth->isUserActive($user)) {
            return $this->errorResponse($request, ['error' => 'Inactive account']);
        }

        session(['two_factor_user_id' => $user->id]);

        return $this->handleTwoFactor($request, $user);
    }

    /* ---------------- TWO FACTOR ---------------- */

    private function handleTwoFactor(Request $request, User $user)
    {
        if ($user->two_fa === 'OTP') {
            $otp = $this->auth->sendLoginOtp($user);

            return redirect()->route('auth.secure.login.page', [
                'two_fa_type' => 'OTP',
                'user_id' => $user->id,
                'otp_ref' => $otp['otp_ref'],
            ]);
        }

        if ($user->two_fa === 'MPIN') {
            return redirect()->route('auth.secure.login.page', [
                'two_fa_type' => 'MPIN',
                'user_id' => $user->id,
            ]);
        }

        return $this->completeLogin($request, $user);
    }

    /* ---------------- SECURE LOGIN ---------------- */

    public function secureLogin(Request $request)
    {
        $userId = session('two_factor_user_id');
        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('auth.login.page');
        }

        if ($request->filled('otp')) {
            $result = $this->auth->verifyOtp($request->otp_ref, $request->otp, $user->id);

            if (!$result['success']) {
                return back()->withErrors(['otp' => 'Invalid OTP']);
            }
        }

        if ($request->filled('mpin')) {
            if (!$this->auth->verifyMpin($user, $request->mpin)) {
                return back()->withErrors(['mpin' => 'Invalid MPIN']);
            }
        }

        return $this->completeLogin($request, $user);
    }

    private function completeLogin(Request $request, User $user)
    {
        Auth::login($user);
        $request->session()->regenerate();

        $this->auth->generateApiToken($user);

        return redirect()->route('dashboard');
    }

    /* ---------------- LOGOUT ---------------- */

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login.page');
    }

    /* ---------------- OTP ---------------- */

    public function resendOtp(Request $request)
    {
        $user = $this->auth->getUserFromUsername($request->username);

        if (!$user) {
            return $this->errorResponse($request, ['error' => 'User not found']);
        }

        $otp = $this->auth->sendLoginOtp($user);

        return response()->json([
            'success' => true,
            'otp_ref' => $otp['otp_ref']
        ]);
    }

    /* ---------------- PASSWORD ---------------- */

    public function forgetPassword(Request $request)
    {
        $user = $this->auth->getUserFromUsername($request->username);

        if (!$user) {
            return $this->errorResponse($request, ['error' => 'User not found']);
        }

        $newPassword = $this->auth->generateRandomPassword();
        $this->auth->resetUserPassword($user, $newPassword);

        return back()->with('success', 'Password sent to mobile');
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        if (!$this->auth->changePassword($user, $request->current_password, $request->new_password)) {
            return $this->errorResponse($request, ['current_password' => 'Wrong password']);
        }

        return back()->with('success', 'Password changed');
    }

    /* ---------------- MPIN ---------------- */

    public function changeMPin(Request $request)
    {
        $user = Auth::user();

        if (!$this->auth->changeMpin($user, $request->current_mpin, $request->new_mpin)) {
            return $this->errorResponse($request, ['mpin' => 'Invalid MPIN']);
        }

        return back()->with('success', 'MPIN updated');
    }

    public function resetMpin(Request $request)
    {
        $user = $this->auth->getUserFromUsername($request->username);

        if (!$user) {
            return $this->errorResponse($request, ['error' => 'User not found']);
        }

        $newMpin = $this->auth->generateRandomMpin();
        $this->auth->resetUserMpin($user, $newMpin);

        return back()->with('success', 'MPIN sent to mobile');
    }

    /* ---------------- PROFILE ---------------- */

    public function getProfileData()
    {
        return response()->json([
            'user' => Auth::user()
        ]);
    }

    public function changeTwoFa(Request $request)
    {
        $user = Auth::user();
        $user->two_fa = $request->two_fa;
        $user->save();

        return back()->with('success', '2FA updated');
    }

    /* ---------------- HELPERS ---------------- */

    private function errorResponse(Request $request, $errors)
    {
        if ($this->isApiRequest($request)) {
            return ResponseHelper::validation($errors);
        }

        return back()->withErrors($errors);
    }
}