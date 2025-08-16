<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historico extends Model
{
    protected $table = 'historico';

    protected $fillable = [
        'cep',
        'cidade',
        'uf',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
