<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WeatherStackService;
use Illuminate\Http\Request;

class WeatherStackController  extends Controller
{
    protected WeatherStackService $weatherStackService;

    public function __construct(WeatherStackService $weatherStackService)
    {
        $this->weatherStackService = $weatherStackService;
    }

    /**
     * Retorna o clima atual com base em cidade ou coordenadas
     */
    public function buscaClimaAtual(Request $request)
    {
        $query = $request->query('query');

        if (!$query) {
            return response()->json([
                'message' => 'Parâmetro "query" é obrigatório.',
            ], 400);
        }

        $climaAtual = $this->weatherStackService->buscaClimaAtual($query);
        if (!$climaAtual) {
            return response()->json([
                'message' => 'Previsão do tempo não encontrada para a consulta: ' . $query,
            ], 404);
        }

        return response()->json($climaAtual);
    }
}
