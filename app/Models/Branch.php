<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    //
    protected $table = 'branch';

    protected $fillable = [
        'branch_name',
        'brak',
        'brcode'
    ];
    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function tickets() {
        return $this->hasMany(Ticket::class);
    }
}
