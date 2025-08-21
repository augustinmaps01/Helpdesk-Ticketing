<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventBackHistory
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // Set comprehensive no-cache headers for all routes
        $response->headers->set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, private, no-transform');
        $response->headers->set('Pragma', 'no-cache');
        $response->headers->set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s') . ' GMT');
        
        // Additional headers to prevent caching
        $response->headers->set('Vary', '*');
        $response->headers->set('X-Accel-Expires', '0');
        
        // For authenticated routes, add stronger cache prevention
        if (auth()->check()) {
            $response->headers->set('Clear-Site-Data', '"cache"');
        }

        return $response;
    }
}
