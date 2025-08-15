<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\LogRequest;
use App\Http\Controllers\Api\ViaCepController;
use App\Http\Controllers\Api\WeatherStackController;

Route::middleware([LogRequest::class])->group(function () {
    Route::get('/viacep/{cep}', [ViaCepController::class, 'buscarPorCep']);
    Route::prefix('weatherstack')->group(function () {
        // Deve ser enviado o parâmetro 'query' com a cidade ou coordenadas
        // Exemplo: /weatherstack/current?query=Chapeco,sc
        Route::get('/current', [WeatherStackController::class, 'buscaClimaAtual']);
    });
});
