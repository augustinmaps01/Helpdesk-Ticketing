<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketAssignment extends Model
{
    //
    protected $table = 'ticket_assignments';
    protected $fillable = [
        'ticket_id',
        'assigned_to',
        'assigned_by',
        'assigned_at'
    ];
    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
    public function assignedTo()
    {
        return $this->belongsTo(Employee::class, 'assigned_to');
    }
    public function assignedBy()
    {
        return $this->belongsTo(Employee::class, 'assigned_by');
    }


}
