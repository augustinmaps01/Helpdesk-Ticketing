<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Branch;
use App\Models\Department;
use App\Models\Roles;
use App\Models\Ticket;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Get total counts from database
            $totalBranches = Branch::count();
            $totalDepartments = Department::count();
            $totalRoles = Roles::count();
            
            // Get ticket statistics
            $totalTickets = Ticket::count();
            $openTickets = Ticket::where('status', 'Open')->count();
            $inProgressTickets = Ticket::where('status', 'In Progress')->count();
            $pendingTickets = Ticket::where('status', 'Pending')->count();
            $closedTickets = Ticket::where('status', 'Closed')->count();
            
            // Mock data for tickets (can be replaced with real data later)
            $tickets = [
                ['id' => 'TKT001', 'status' => 'Open'],
                ['id' => 'TKT002', 'status' => 'In Progress'],
                ['id' => 'TKT003', 'status' => 'Pending'],
                ['id' => 'TKT004', 'status' => 'Closed'],
                ['id' => 'TKT005', 'status' => 'Open'],
                ['id' => 'TKT006', 'status' => 'Open'],
                ['id' => 'TKT007', 'status' => 'In Progress'],
            ];
            
            // Mock categories data (can be replaced with real data later)
            $categories = [
                ['id' => 'C001', 'name' => 'Hardware'],
                ['id' => 'C002', 'name' => 'Software'],
                ['id' => 'C003', 'name' => 'Network'],
                ['id' => 'C004', 'name' => 'Account'],
            ];

            return Inertia::render('dashboard', [
                'dashboardData' => [
                    'totalBranches' => $totalBranches,
                    'totalDepartments' => $totalDepartments,
                    'totalRoles' => $totalRoles,
                    'totalTickets' => $totalTickets,
                    'openTickets' => $openTickets,
                    'inProgressTickets' => $inProgressTickets,
                    'pendingTickets' => $pendingTickets,
                    'closedTickets' => $closedTickets,
                ],
                'tickets' => $tickets,
                'categories' => $categories,
            ]);
        } catch (\Exception $e) {
            // Fallback to mock data if there's an error
            return Inertia::render('dashboard', [
                'dashboardData' => [
                    'totalBranches' => 0,
                    'totalDepartments' => 0,
                    'totalRoles' => 0,
                    'totalTickets' => 0,
                    'openTickets' => 0,
                    'inProgressTickets' => 0,
                    'pendingTickets' => 0,
                    'closedTickets' => 0,
                ],
                'tickets' => [],
                'categories' => [],
            ]);
        }
    }
}