<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    //
    protected $table = 'departments';
    protected $fillable = ['name'];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    // Removed tickets relationship - tickets table doesn't have department_id column
    // public function tickets() {
    //     return $this->hasMany(Ticket::class);
    // }

}
