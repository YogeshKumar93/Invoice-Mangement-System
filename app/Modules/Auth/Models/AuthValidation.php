<?php

namespace App\Modules\Auth\Models;

use Illuminate\Support\Facades\Validator;

class AuthValidation
{
    /**
     * Validate sign in request
     */
    public static function signIn(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|min:5',
            'password' => 'required|string|min:4',
        ], [
            'username.required' => 'Username is required',
            'username.min' => 'Username must be at least 5 characters',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be at least 4 characters',
        ]);
    }

    /**
     * Validate secure login (2FA)
     */
    public static function secureLogin(array $data)
    {
        $rules = [
            'username' => 'required|string',
        ];
        
        // Add conditional validation based on 2FA type
        if (isset($data['otp']) && !empty($data['otp'])) {
            $rules['otp'] = 'required|digits:6';
            $rules['otp_ref'] = 'required|string';
        } elseif (isset($data['mpin']) && !empty($data['mpin'])) {
            $rules['mpin'] = 'required|digits:6';
        }
        
        return Validator::make($data, $rules, [
            'otp.digits' => 'OTP must be 6 digits',
            'mpin.digits' => 'MPIN must be 6 digits',
        ]);
    }

    /**
     * Validate OTP resend
     */
    public static function resendOtp(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string',
        ]);
    }

    /**
     * Validate forget password
     */
    public static function forgetPassword(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|min:5',
        ]);
    }

    /**
     * Validate reset MPIN
     */
    public static function resetMpin(array $data)
    {
        return Validator::make($data, [
            'username' => 'required|string|min:5',
        ]);
    }

    /**
     * Validate change password
     */
    public static function changePassword(array $data)
    {
        return Validator::make($data, [
            'current_password' => 'required|string|min:4',
            'new_password' => 'required|string|min:4|confirmed',
            'new_password_confirmation' => 'required|string|min:4',
        ]);
    }

    /**
     * Validate change MPIN
     */
    public static function changeMPin(array $data)
    {
        return Validator::make($data, [
            'current_mpin' => 'required|digits:6',
            'new_mpin' => 'required|digits:6|confirmed',
            'new_mpin_confirmation' => 'required|digits:6',
        ]);
    }

    /**
     * Validate approve QR
     */
    public static function approveQr(array $data)
    {
        return Validator::make($data, [
            'token' => 'required|string',
        ]);
    }
}