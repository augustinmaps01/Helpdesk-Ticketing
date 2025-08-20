<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    //
    protected $table = 'roles';

    protected $fillable = ['name'];

    public function employees() {
        return $this->hasMany(Employee::class);
    }

    public function users() {
        return $this->hasMany(User::class, 'role_id');
    }
}
