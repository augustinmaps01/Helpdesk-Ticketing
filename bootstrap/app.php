<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\EnsureAuthenticated;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\StrictAuthentication;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use App\Http\Middleware\PreventBackHistory;
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            PreventBackHistory::class,
        ]);
        
        // Register custom authentication middleware
        $middleware->alias([
            'ensure.authenticated' => EnsureAuthenticated::class,
            'strict.auth' => StrictAuthentication::class,
            'guest' => RedirectIfAuthenticated::class,
            'role' => \App\Http\Middleware\CheckRole::class,
            'roles' => \App\Http\Middleware\CheckMultipleRoles::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
