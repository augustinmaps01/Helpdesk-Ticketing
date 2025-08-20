<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    //
    protected $table = 'tickets';
    protected $fillable = [
        'ticket_no',
        'subject',
        'description',
        'status',
        'priority',
        'image',
        'requires_approval',
        'category_id',
        'assigned_to',
        'submitted_by' // employee

    ];
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function assignedTo()
    {
        return $this->belongsTo(Employee::class, 'assigned_to');
    }
    public function submittedBy()
    {
        return $this->belongsTo(Employee::class, 'submitted_by');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function approvals()
    {
        return $this->hasMany(Approval::class);
    }
    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }

    public function assignments()
    {
        return $this->hasMany(TicketAssignment::class);
    }


}
