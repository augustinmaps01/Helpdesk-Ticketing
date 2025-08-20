<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    //
    protected $table = 'audit_logs';
    protected $fillable = [
        'ticket_id',
        'action',
        'performed_by',
        'performed_at'
    ];

    public function performedBy()
    {
        return $this->belongsTo(Employee::class, 'performed_by');
    }
}
