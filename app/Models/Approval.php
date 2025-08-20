<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $table = 'approvals';
    
    protected $fillable = [
        'ticket_id', 
        'approved_by', 
        'approved_at', 
        'status',
        'approval_level',
        'required_role',
        'comments'
    ];

    protected $casts = [
        'approved_at' => 'datetime'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
