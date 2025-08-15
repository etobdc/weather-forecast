<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherStackService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = 'http://api.weatherstack.com';
        $this->apiKey = config('services.weatherstack.key');
    }

    public function buscaClimaAtual(string $query)
    {
        $params = [
            'access_key' => $this->apiKey,
            'units' => 'm',
            'language' => config('app.locale'),
            'query' => $query,
        ];

        $response = Http::get($this->baseUrl.'/current', $params);

        if ($response->failed()) {
            return null;
        }

        return $response->json();
    }
}
