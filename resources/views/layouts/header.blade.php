<div class="container margin-central mb-4 mt-2">
    <nav class="nav nav-underline nav-fill d-flex align-items-center">
        <a class="nav-link {{request()->segment(1) == '' ? 'active' : '';}} text-decoration-none fw-bolder fs-5 p-1 text-bg-primary" href="/">
            <i class="bi bi-cloud-sun-fill mr-2"></i> Weather Forecast
        </a>
        <a class="nav-link {{request()->segment(1) == 'historico' ? 'active' : '';}}" href="/historico">Histórico de pesquisa</a>
        <a class="nav-link {{request()->segment(1) == 'previsoes' ? 'active' : '';}}" href="/previsoes">Previsões salvas</a>
        <a class="nav-link {{request()->segment(1) == 'comparar' ? 'active' : '';}}" href="/comparar">Compare cidades</a>
    </nav>
</div>
