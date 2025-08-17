<div class="container margin-central mb-4 mt-2 d-none d-md-block">
    <nav class="nav nav-underline nav-fill d-flex align-items-center">
        <a class="nav-link {{request()->segment(1) == '' ? 'active' : '';}} text-decoration-none fw-bolder fs-5 p-1 text-bg-primary" href="/">
            <i class="bi bi-cloud-sun-fill mr-2"></i> Weather Forecast
        </a>
        <a class="nav-link {{request()->segment(1) == 'historico' ? 'active' : '';}}" href="/historico">Histórico de pesquisa</a>
        <a class="nav-link {{request()->segment(1) == 'previsoes' ? 'active' : '';}}" href="/previsoes">Previsões salvas</a>
        <a class="nav-link {{request()->segment(1) == 'comparar' ? 'active' : '';}}" href="/comparar">Compare cidades</a>
    </nav>
</div>
<div class="container margin-central mb-4 py-2 d-block d-md-none bg-primary">
    <nav class="nav nav-underline nav-fill d-flex justify-content-between align-items-center">
        <a class="{{request()->segment(1) == '' ? 'active' : '';}} text-decoration-none fw-bolder fs-5 p-1 text-bg-primary" href="/">
            <i class="bi bi-cloud-sun-fill mr-2"></i> Weather Forecast
        </a>
        <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-list mr-2"></i>
            </button>
            <ul class="dropdown-menu">
                <li>
                    <a href="/" class="text-decoration-none">
                        <button class="dropdown-item {{request()->segment(1) == '' ? 'active' : '';}}" type="button">
                            Home
                        </button>
                    </a>
                </li>
                <li>
                    <a href="historico" class="text-decoration-none">
                        <button class="dropdown-item {{request()->segment(1) == 'historico' ? 'active' : '';}}" type="button">
                            Histórico de pesquisa
                        </button>
                    </a>
                </li>
                <li>
                    <a href="previsoes" class="text-decoration-none">
                        <button class="dropdown-item {{request()->segment(1) == 'previsoes' ? 'active' : '';}}" type="button">
                            Previsões salvas
                        </button>
                    </a>
                </li>
                <li>
                    <a href="comparar" class="text-decoration-none">
                        <button class="dropdown-item {{request()->segment(1) == 'comparar' ? 'active' : '';}}" type="button">
                            Compare cidades
                        </button>
                    </a>
                </li>
                <li>
                    <button class="dropdown-item " type="button" onclick="setTheme()">
                        Alterar tema
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</div>
