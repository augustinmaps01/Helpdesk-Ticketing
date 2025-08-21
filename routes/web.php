<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuditTrailController;
use App\Http\Controllers\LandingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Guest-only routes (redirect authenticated users to dashboard)
Route::middleware('guest')->group(function () {
    Route::get('/', [LandingController::class, 'index'])->name('landing.page');
    
    // Public ticket creation (only for non-authenticated users)
    Route::get('/create-ticket', [TicketController::class, 'create'])->name('tickets.create');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
});

// Authenticated routes with strict authentication
Route::middleware(['auth', 'verified', 'strict.auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Management Features (Resource Controllers)
    Route::resource('categories', CategoryController::class);
    Route::resource('roles', RolesController::class);
    Route::resource('departments', DepartmentController::class);
    Route::resource('branches', BranchController::class);
    
    // User Management
    Route::resource('users', UserController::class)->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']);
    Route::post('users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
    
    // Ticket Management (Resource Controller)
    Route::resource('tickets', TicketController::class)->except(['create', 'store']);
    Route::post('tickets/{ticket}/approve', [TicketController::class, 'approve'])->name('tickets.approve');

    // Audit Trails
    Route::resource('audit-trails', AuditTrailController::class)->only(['index', 'show']);
});

// Include additional route files
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';