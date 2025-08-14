<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\LogRequest;
use App\Http\Controllers\Api\ViaCepController;

Route::middleware([LogRequest::class])->group(function () {
    Route::get('/viacep/{cep}', [ViaCepController::class, 'buscarPorCep']);
});
