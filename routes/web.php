<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\LogRequest;

Route::middleware([LogRequest::class])->group(function () {
    Route::get('/', function () {
        return view('home');
    });
    Route::get('/previsoes', function () {
        return view('previsaoSalva');
    });
    Route::get('/historico', function () {
        return view('historico');
    });
});
