<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'url',
        'method',
        'request_json',
        'response_json',
        'status',
        'ip_address',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
