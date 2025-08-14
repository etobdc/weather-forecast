<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ViaCepService;
use Illuminate\Http\Request;

class ViaCepController extends Controller
{
    protected ViaCepService $viaCepService;

    public function __construct(ViaCepService $viaCepService)
    {
        $this->viaCepService = $viaCepService;
    }

    /**
     * Busca endereço pelo CEP via API externa.
     */
    public function buscarPorCep(Request $request, string $cep)
    {
        $endereco = $this->viaCepService->buscarPorCep($cep);

        if (!$endereco) {
            return response()->json([
                'message' => 'CEP não encontrado ou inválido.'
            ], 404);
        }

        return response()->json($endereco);
    }
}
