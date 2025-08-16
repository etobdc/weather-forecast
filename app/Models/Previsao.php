<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Previsao extends Model
{
    protected $table = 'previsao';

    protected $fillable = [
        'response_json',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
