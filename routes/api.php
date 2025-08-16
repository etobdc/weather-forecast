<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\LogRequest;
use App\Http\Controllers\Api\ViaCepController;
use App\Http\Controllers\Api\WeatherStackController;
use App\Http\Controllers\Api\PrevisaoController;
use App\Http\Controllers\Api\HistoricoController;

Route::middleware([LogRequest::class])->group(function () {
    Route::get('/viacep/{cep}', [ViaCepController::class, 'buscarPorCep']);
    Route::prefix('weatherstack')->group(function () {
        // Deve ser enviado o parâmetro 'query' com a cidade ou coordenadas
        // Exemplo: /weatherstack/current?query=Chapeco,sc
        Route::get('/current', [WeatherStackController::class, 'buscaClimaAtual']);
    });
    Route::prefix('previsao')->group(function () {
        Route::get('/', [PrevisaoController::class, 'index']);
        Route::get('/{id}', [PrevisaoController::class, 'show']);
        Route::post('/novo', [PrevisaoController::class, 'store']);
        Route::delete('/remove/{id}', [PrevisaoController::class, 'destroy']);
    });
    Route::prefix('historico')->group(function () {
        Route::get('/', [HistoricoController::class, 'index']);
        Route::post('/novo', [HistoricoController::class, 'store']);
        Route::delete('/remove/{id}', [HistoricoController::class, 'destroy']);
    });
});
