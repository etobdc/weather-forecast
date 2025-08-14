<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Log as Log;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

    public function terminate($request, $response)
    {
        $url = $request->path();
        $request_json = null;
        $response_json = null;

        if (str_contains($url, 'api')) {
            $request_json = $request->all();
            if (!empty($request_json)) {
                if (!is_string($request_json)) {
                    $request_json = json_encode($request_json);
                }
            }

            $response_json = $response->content();
            if (!empty($response_json)) {
                if (!is_string($response_json)) {
                    $response_json = json_encode($response_json);
                }
            }
        }

        Log::create([
            'url' => $request->path(),
            'method' => $request->method(),
            'request_json' => $request_json ? addslashes($request_json) : null,
            'response_json' => $response_json ? addslashes($response_json) : null,
            'status' => $response->getStatusCode(),
            'ip_address' => $request->getClientIps()[0],
        ]);
    }

}
