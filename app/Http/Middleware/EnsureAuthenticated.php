<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            // Clear any stale session data
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            // Set no-cache headers to prevent back navigation
            $response = redirect()->route('login')->with('error', 'Please log in to access this page.');
            
            $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', 'Sat, 01 Jan 1990 00:00:00 GMT');
            
            return $response;
        }
        
        // Verify session is still valid
        if (!$request->session()->has('_token') || 
            !$request->session()->get('_token') ||
            $request->session()->get('_token') !== csrf_token()) {
            
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            $response = redirect()->route('login')->with('error', 'Your session has expired. Please log in again.');
            
            $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', 'Sat, 01 Jan 1990 00:00:00 GMT');
            
            return $response;
        }

        $response = $next($request);
        
        // Add no-cache headers to authenticated pages
        $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', 'Sat, 01 Jan 1990 00:00:00 GMT');
        
        return $response;
    }
}
