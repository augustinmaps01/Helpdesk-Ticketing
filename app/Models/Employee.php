<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $table = 'employees';
    protected $fillable = [
        'name',
        'position',
        'mobile_no',
        'role_id',
        'branch_id',
        'department_id'
    ];

    public function branch () {
        return $this->belongsTo(Branch::class);
    }
    public function department () {
        return $this->belongsTo(Department::class);
    }
    public function submittedTickets() {
        return $this->hasMany(Ticket::class, 'submitted_by');
    }
    public function assignedTickets()
    {
        return $this->hasMany(Ticket::class, 'assigned_to');
    }
    public function performedAssignments()
    {
        return $this->hasMany(TicketAssignment::class, 'assigned_by');
    }
    public function approvals()
    {
        return $this->hasMany(Approval::class, 'approved_by');
    }
        public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }
}
