<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    //
    protected $table = 'roles';

    protected $fillable = ['name'];

    public function employees() {
        return $this->hasMany(Employee::class, 'role_id');
    }

}
