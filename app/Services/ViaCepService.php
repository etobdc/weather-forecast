<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ViaCepService
{
    protected string $baseUrl = 'https://viacep.com.br/ws/';

    /**
     * Busca endereço pelo CEP.
     *
     * @param string $cep
     * @return array|null
     */
    public function buscarPorCep(string $cep): ?array
    {
        $cep = preg_replace('/\D/', '', $cep); // remove caracteres não numéricos

        $response = Http::get("{$this->baseUrl}{$cep}/json/");

        if ($response->failed() || isset($response['erro'])) {
            return null;
        }

        return $response->json();
    }
}
