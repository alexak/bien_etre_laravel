<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;




class UserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function showRegisterForm(): Response
    {
        return Inertia::render('Auth', [
            'authform' => 'newAccount'
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $userRole = Role::where('name', 'User')->first();

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = $userRole; 
        $user->save();
        $user->sendEmailVerificationNotification();

        event(new Registered($user));
        Auth::login($user);

        return back()->with('status', 'verification-link-sent');
    }


    public function confirmMail($token){
        $user = User::where('email_token', $token)->first();

        if ($user && !$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            $user->save();
            return redirect(RouteServiceProvider::HOME)->with('status', "L'email était vérifié avec succèss");
        }

        return redirect(RouteServiceProvider::HOME)->with('status', 'Invalid or already verified token.');
        //return redirect(RouteServiceProvider::HOME)->with('error', 'Invalid or already verified token.');
    }
}
