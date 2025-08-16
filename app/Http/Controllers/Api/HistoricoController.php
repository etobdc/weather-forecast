<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Historico;

class HistoricoController  extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $historico = Historico::orderBy('created_at', 'desc')->get();
        return response()->json($historico);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            Historico::create($request->all());
            return response()->json(['message' => 'Histórico criado com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao criar Histórico.', 'error' => $th->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $historico = Historico::find($id);
            if (!$historico) {
                throw new \Exception("Previsão não encontrada.");
            }
            $historico->delete();
            return response()->json(['message' => 'Histórico deletada com sucesso!']);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro ao deletar Histórico.', 'error' => $th->getMessage()], 400);
        }
    }
}
