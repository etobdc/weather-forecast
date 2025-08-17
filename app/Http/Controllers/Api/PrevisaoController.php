<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Previsao;

class PrevisaoController  extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $previsoes = Previsao::whereNotNull('response_json')
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($previsoes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!$request->has('response_json')) {
            return response()->json(['message' => 'O campo response_json é obrigatório.'], 400);
        }
        try {
            Previsao::create([
                'localidade' => $request->input('localidade'),
                'response_json' => json_encode($request->input('response_json')),
            ]);
            return response()->json(['message' => 'Previsão criada com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao criar previsão.', 'error' => $th->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $previsao = Previsao::find($id);
            if (!$previsao) {
                throw new \Exception("Previsão não encontrada.");
            }
            return response()->json($previsao);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Previsão não encontrada.'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $previsao = Previsao::find($id);
            if (!$previsao) {
                throw new \Exception("Previsão não encontrada.");
            }
            $previsao->delete();
            return response()->json(['message' => 'Previsão deletada com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao deletar previsão.', 'error' => $th->getMessage()], 400);
        }
    }
}
