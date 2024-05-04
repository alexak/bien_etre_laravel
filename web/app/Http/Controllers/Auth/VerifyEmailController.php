<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use App\Models\User;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function store(EmailVerificationRequest $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME.'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(RouteServiceProvider::HOME.'?verified=1');
    }

    
    public function verifyMail($token): RedirectResponse
    {
    // Find the user by the given token
    $user = User::where('email_token', $token)->first();

    // Check if the user was found and if the user's email is not already verified
    if ($user && !$user->hasVerifiedEmail()) {
        // Mark the email as verified
        $user->markEmailAsVerified();

        // Save the user
        $user->save();

        // Redirect to a specific page with a success message
        return redirect(RouteServiceProvider::HOME)->with('status', 'Email verified successfully!');
    }

    // Redirect to a specific page with an error message if no user is found or email is already verified
    return redirect(RouteServiceProvider::HOME)->with('error', 'Invalid or already verified token.');
    }
}
