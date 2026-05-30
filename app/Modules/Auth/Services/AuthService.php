<?php

namespace App\Modules\Auth\Services;

use App\Modules\User\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthService
{
    /**
     * Get user from username (GURU pattern)
     * Example: GURU123 -> user id 123
     * Example: GURUAD123 -> user id 123 with role AD
     */
    public function getUserFromUsername(string $username): ?User
    {
        // Extract numeric ID from username (remove GURU and role prefix)
        preg_match('/IMS([A-Z]*)(\d+)/', $username, $matches);
        
        if (isset($matches[2])) {
            $userId = (int) $matches[2];
            return User::find($userId);
        }
        
        return null;
    }

    /**
     * Generate username based on user role
     */
    public function generateUsername(User $user): string
    {
        $roleMap = [
            'adm'  => 'AD',
            'sadm' => 'SA',
            'asm'  => 'AS',
            'zsm'  => 'ZS',
            'md'   => 'SD',
            'di'   => 'DI',
            'ret'  => 'RT',
            'dd'   => 'DD',
            'ptr'  => 'PA',
            'slh'  => 'SH',
            'rsm'  => 'RH',
            'tsm'  => 'TH',
            'acc'  => 'AC',
            'api'  => 'AP'
        ];

        if ($user->role == 'guru') {
            return 'GURU' . $user->id;
        }

        $roleShort = $roleMap[$user->role] ?? 'US';
        return 'GURU' . $roleShort . $user->id;
    }

    /**
     * Verify password
     */
    public function verifyPassword(User $user, string $password): bool
    {
        return Hash::check($password, $user->password);
    }

    /**
     * Check if user is active
     */
    public function isUserActive(User $user): bool
    {
        return $user->is_active == 1 || $user->status === 'active';
    }

    /**
     * Check if user agent is allowed
     */
    public function isUserAgentAllowed(Request $request): bool
    {
        // Allow all for now, implement specific logic if needed
        return true;
    }

    /**
     * Send login OTP
     */
    public function sendLoginOtp(User $user): array
    {
        $otp = rand(100000, 999999);
        $otpRef = Str::random(32);
        
        // Store OTP in cache
        Cache::put($otpRef, [
            'otp' => $otp,
            'user_id' => $user->id,
            'expires_at' => Carbon::now()->addMinutes(5)
        ], 300);
        
        // Log OTP for testing (remove in production)
        Log::info("OTP for {$user->username}: {$otp}");
        
        // In production, send SMS here
        // $this->sendSms($user->mobile, "Your OTP is: $otp");
        
        return [
            'otp_ref' => $otpRef,
            'otp' => $otp // Remove in production
        ];
    }

    /**
     * Verify OTP
     */
    public function verifyOtp(?string $otpRef, ?string $otp, int $userId): array
    {
        if (!$otpRef || !$otp) {
            return ['success' => false, 'message' => 'OTP and reference required'];
        }
        
        $cached = Cache::get($otpRef);
        
        if (!$cached) {
            return ['success' => false, 'message' => 'Invalid or expired OTP'];
        }
        
        if ($cached['user_id'] !== $userId) {
            return ['success' => false, 'message' => 'Invalid OTP for this user'];
        }
        
        if ($cached['otp'] != $otp) {
            return ['success' => false, 'message' => 'Wrong OTP'];
        }
        
        if (Carbon::now()->isAfter($cached['expires_at'])) {
            Cache::forget($otpRef);
            return ['success' => false, 'message' => 'OTP expired'];
        }
        
        Cache::forget($otpRef);
        
        return ['success' => true, 'message' => 'OTP verified'];
    }

    /**
     * Verify MPIN
     */
    public function verifyMpin(User $user, string $mpin): bool
    {
        if (empty($user->mpin)) {
            return false;
        }
        return Hash::check($mpin, $user->mpin);
    }

    /**
     * Increment MPIN retries
     */
    public function incrementMpinRetries(User $user): void
    {
        $key = "mpin_retries_{$user->id}";
        $retries = Cache::get($key, 0);
        Cache::put($key, $retries + 1, 15); // 15 minutes window
    }

    /**
     * Reset MPIN retries
     */
    public function resetMpinRetries(User $user): void
    {
        Cache::forget("mpin_retries_{$user->id}");
    }

    /**
     * Check if OTP is required (based on device trust)
     */
    public function isOtpRequired(User $user, string $ip): bool
    {
        $trustedDevices = explode(',', $user->trusted_devices ?? '');
        return !in_array($ip, $trustedDevices);
    }

    /**
     * Refresh device trust
     */
    public function refreshDeviceTrust(User $user, string $ip): void
    {
        $trustedDevices = explode(',', $user->trusted_devices ?? '');
        if (!in_array($ip, $trustedDevices)) {
            $trustedDevices[] = $ip;
            $user->trusted_devices = implode(',', array_slice($trustedDevices, -5)); // Keep last 5
            $user->save();
        }
    }

    /**
     * Generate API token
     */
    public function generateApiToken(User $user): void
    {
        $user->api_token = hash('sha256', Str::random(60));
        $user->save();
    }

    /**
     * Refresh API token
     */
    public function refreshApiToken(User $user): void
    {
        $user->api_token = null;
        $user->save();
    }

    /**
     * Clear two-factor session
     */
    public function clearTwoFaSession(): void
    {
        session()->forget(['two_factor_user_id', 'otp_ref']);
    }

    /**
     * Generate random password
     */
    public function generateRandomPassword(): string
    {
        $letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $special = '!@#$%';
        
        return substr(str_shuffle($letters), 0, 6) . 
               substr(str_shuffle($numbers), 0, 2) . 
               substr(str_shuffle($special), 0, 1);
    }

    /**
     * Reset user password
     */
    public function resetUserPassword(User $user, string $newPassword): void
    {
        $user->password = Hash::make($newPassword);
        $user->save();
        
        Log::info("Password reset for user: {$user->username}");
    }

    /**
     * Change password
     */
    public function changePassword(User $user, string $currentPassword, string $newPassword): bool
    {
        if (!Hash::check($currentPassword, $user->password)) {
            return false;
        }
        
        $user->password = Hash::make($newPassword);
        $user->save();
        
        return true;
    }

    /**
     * Change MPIN
     */
    public function changeMpin(User $user, string $currentMpin, string $newMpin): bool
    {
        if (!Hash::check($currentMpin, $user->mpin ?? '')) {
            return false;
        }
        
        $user->mpin = Hash::make($newMpin);
        $user->save();
        
        return true;
    }

    /**
     * Generate random MPIN (6 digits)
     */
    public function generateRandomMpin(): string
    {
        return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Reset user MPIN
     */
    public function resetUserMpin(User $user, string $newMpin): void
    {
        $user->mpin = Hash::make($newMpin);
        $user->save();
        
        Log::info("MPIN reset for user: {$user->username}, new MPIN: {$newMpin}");
    }

    /**
     * Generate daily password
     */
    public function generateDailyPassword(User $user): array
    {
        $password = strtoupper(Str::random(8));
        $expiresAt = Carbon::now()->addMinutes(15);
        
        $user->daily_password = Hash::make($password);
        $user->daily_password_expires_at = $expiresAt;
        $user->save();
        
        return [
            'plain' => $password,
            'expires_at' => $expiresAt
        ];
    }

    /**
     * Send daily password SMS
     */
    public function sendDailyPasswordSms(User $user, string $password): void
    {
        // Log for testing
        Log::info("Daily password for {$user->username}: {$password}");
        
        // In production: Send SMS
        // SMS::send($user->mobile, "Your daily password is: {$password}");
    }

    /**
     * Verify daily password
     */
    public function verifyDailyPassword(User $user, string $password): bool
    {
        // Check if password exists and not expired
        if (empty($user->daily_password) || empty($user->daily_password_expires_at)) {
            return false;
        }
        
        // Check expiration
        if (Carbon::now()->isAfter($user->daily_password_expires_at)) {
            return false;
        }
        
        // Verify password
        return Hash::check($password, $user->daily_password);
    }

    /**
     * Check if user can use daily login
     */
    public function canUseDailyLogin(User $user): bool
    {
        return $user->login_mode === 'daily' || $user->login_mode === 'both';
    }

    /**
     * Store login device
     */
    public function storeLoginDevice(Request $request, User $user): void
    {
        // Implement device tracking if needed
        $user->last_login_at = Carbon::now();
        $user->last_login_ip = $request->ip();
        $user->save();
    }

    /**
     * Log audit trail
     */
    public function logAudit(?User $user, string $action, string $target, string $details, Request $request, string $status): void
    {
        Log::info("AUDIT: {$action} - User: {$target} - {$details} - Status: {$status} - IP: {$request->ip()}");
        
        // Store in database if you have an audit_logs table
        // AuditLog::create([...]);
    }

    /**
     * Invalidate old OTPs for user
     */
    public function invalidateOldOtps(int $userId): void
    {
        // Clear all OTP cache entries for this user
        // Implementation depends on how you store OTPs
    }
}