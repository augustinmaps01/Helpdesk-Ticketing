<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class StrictAuthentication
{
    /**
     * Handle an incoming request with strict authentication checks.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            return $this->redirectToLogin();
        }

        // Check if user was marked as logged out (prevents back navigation)
        if ($request->session()->has('logged_out_at')) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            return $this->redirectToLogin();
        }

        // Update last activity time for session tracking
        $request->session()->put('last_activity', time());

        // Process the request
        $response = $next($request);

        // Set no-cache headers to prevent back navigation to cached pages
        $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
        $response->headers->set('Clear-Site-Data', '"cache"');

        return $response;
    }

    /**
     * Create a redirect response to login with no-cache headers
     */
    private function redirectToLogin(): Response
    {
        $response = redirect()->route('login')->with('error', 'Please log in to access this page.');
        
        // Set no-cache headers on redirect
        $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
        $response->headers->set('Clear-Site-Data', '"cache", "storage"');
        
        return $response;
    }
}