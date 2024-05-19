<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PasswordResetToken;
use Illuminate\Http\RedirectResponse;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;

class PasswordController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function sendMail(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $sentMessage = Mail::to($request->email)->send(new ResetPasswordMail([
            'token' => PasswordResetToken::getTokenForEmail($request->email)
        ]));

        if ($sentMessage!==null) {
            return back()->with('status', __('RESET_MAIL_SENT'))
                ->header('X-Status-Code', 202);
        }
    }
}
