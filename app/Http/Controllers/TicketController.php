<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Approval;
use App\Models\Branch;
use App\Models\Department;
use App\Models\Category;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with(['branch', 'department', 'category', 'submittedBy', 'assignedTo', 'approvals'])
                         ->latest()
                         ->paginate(10);

        return Inertia::render('tickets', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {
        $branches = Branch::all();
        $departments = Department::all();
        $categories = Category::all();
        $roles = Roles::all();

        return Inertia::render('user/create-ticket', [
            'branches' => $branches,
            'departments' => $departments,
            'categories' => $categories,
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'submitted_by' => 'required|string|max:255',
            'branch' => 'required|exists:branch,id',
            'department' => 'required|exists:departments,id',
            'position' => 'required|exists:roles,id',
            'subject' => 'required|string|max:255',
            'category' => 'required|exists:categories,id',
            'priority' => 'required|in:low,medium,high',
            'description' => 'required|string',
            'requires_approval' => 'boolean',
            'urgent_business_impact' => 'boolean'
        ]);

        // Generate ticket number
        $ticketNo = 'TKT-' . date('Y') . '-' . str_pad(Ticket::count() + 1, 6, '0', STR_PAD_LEFT);

        // Create ticket
        $ticket = Ticket::create([
            'ticket_no' => $ticketNo,
            'subject' => $validated['subject'],
            'description' => $validated['description'],
            'status' => 'pending_approval', // Start with pending approval
            'priority' => $validated['priority'],
            'category_id' => $validated['category'],
            'submitted_by' => $validated['submitted_by'],
            'requires_approval' => $validated['requires_approval'] ?? false
        ]);

        // Create approval record based on priority
        $this->createApprovalRecord($ticket);

        return redirect()->back()->with('success', 'Ticket created successfully! Your ticket number is: ' . $ticketNo);
    }

    private function createApprovalRecord(Ticket $ticket)
    {
        $approvalLevel = $this->getApprovalLevel($ticket->priority);
        
        // Create approval record
        Approval::create([
            'ticket_id' => $ticket->id,
            'approval_level' => $approvalLevel,
            'status' => 'pending',
            'required_role' => $this->getRequiredRole($ticket->priority),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    private function getApprovalLevel($priority)
    {
        return match($priority) {
            'low' => 'manager_blu_head',
            'medium' => 'manager',
            'high' => 'president',
            default => 'manager'
        };
    }

    private function getRequiredRole($priority)
    {
        return match($priority) {
            'low' => 'Manager/BLU Head',
            'medium' => 'Manager',
            'high' => 'President',
            default => 'Manager'
        };
    }

    public function approve(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'action' => 'required|in:approve,reject',
            'comments' => 'nullable|string'
        ]);

        $approval = $ticket->approvals()->where('status', 'pending')->first();
        
        if (!$approval) {
            return redirect()->back()->with('error', 'No pending approval found for this ticket.');
        }

        // Update approval record
        $approval->update([
            'approved_by' => Auth::id(),
            'approved_at' => now(),
            'status' => $validated['action'] === 'approve' ? 'approved' : 'rejected',
            'comments' => $validated['comments']
        ]);

        // Update ticket status
        if ($validated['action'] === 'approve') {
            $ticket->update(['status' => 'approved']);
        } else {
            $ticket->update(['status' => 'rejected']);
        }

        return redirect()->back()->with('success', 'Ticket ' . $validated['action'] . 'd successfully.');
    }

    public function show(Ticket $ticket)
    {
        $ticket->load(['branch', 'department', 'category', 'submittedBy', 'assignedTo', 'approvals.approvedBy']);

        return Inertia::render('tickets/show', [
            'ticket' => $ticket
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $validated = $request->validate([
            'status' => 'required|in:open,in_progress,resolved,closed',
            'assigned_to' => 'nullable|exists:users,id',
            'priority' => 'required|in:low,medium,high'
        ]);

        $ticket->update($validated);

        return redirect()->back()->with('success', 'Ticket updated successfully.');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted successfully.');
    }
}