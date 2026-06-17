<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'age',
        'disease',
        'phone',
    ];

    protected $casts = [
        'age' => 'integer',
    ];
}
