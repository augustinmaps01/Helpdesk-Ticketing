<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response|\Illuminate\Http\RedirectResponse
    {
        // If user is already authenticated, redirect to dashboard
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate the incoming request data
        // For Laravel Breeze/Jetstream, this is often handled by a separate LoginRequest
        // For a custom setup, you might do it here:
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['boolean'], // Added remember validation
        ]);

        // Attempt to authenticate the user
        if (! Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            // If authentication fails, throw a validation exception
            // This will automatically redirect back and populate Inertia's errors object
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'), // Laravel's default message for failed credentials
            ]);

            // Alternatively, if you want a general 'status' message for the AlertMessage component
            // return redirect()->back()->with('status', 'error: These credentials do not match our records.');
        }

        // If authentication succeeds
        $request->session()->regenerate();
        
        // Get the authenticated user
        $user = Auth::user();
        
        // Create a personalized welcome message
        $welcomeMessages = [
            "Welcome back, {$user->name}! Ready to tackle some tickets? 🚀",
            "Hello {$user->name}! Your dashboard is ready and waiting 📊",
            "Great to see you again, {$user->name}! Let's get productive 💪",
            "Welcome home, {$user->name}! Time to make things happen ⭐",
            "Hey {$user->name}! Your IT command center awaits 🎯"
        ];
        
        $randomMessage = $welcomeMessages[array_rand($welcomeMessages)];

        // Redirect to dashboard (standalone features)
        $redirectRoute = 'dashboard';
        
        return redirect()->intended(route($redirectRoute, absolute: false))
                         ->with('loginSuccess', true)
                         ->with('welcome', $randomMessage);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Clear any remember tokens
        if ($user = Auth::user()) {
            $user->remember_token = null;
            $user->save();
        }

        // Logout from the web guard
        Auth::guard('web')->logout();

        // Invalidate the session completely
        $request->session()->invalidate();
        
        // Regenerate the CSRF token
        $request->session()->regenerateToken();
        
        // Clear all session data
        $request->session()->flush();
        
        // Forget any session data that might be cached
        $request->session()->forget(['_token', '_previous', '_flash']);

        // Create the redirect response
        $response = redirect()->route('login');

        // Set comprehensive no-cache headers
        $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', 'Sat, 01 Jan 1990 00:00:00 GMT');
        $response->headers->set('Clear-Site-Data', '"cache", "cookies", "storage"');
        
        // Add success message for logout
        $response->with('status', 'You have been successfully logged out.');

        return $response;
    }
}
