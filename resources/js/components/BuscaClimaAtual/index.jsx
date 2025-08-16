import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputCep } from 'react-input-cep'
import axios from 'axios';
import compassRose from './compassRose.js';
import weatherCodes from './weatherCodes.js';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
moment.locale('pt-br')

const styles = {
    input: {
        display: 'block',
        width: '100%',
        padding: '6px 12px',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: 1.5,
        color: 'var(--bs-body-color)',
        appearance: 'none',
        backgroundColor: 'var(--bs-body-bg)',
        backgroundClip: 'padding-box',
        border: 'var(--bs-border-width) solid var(--bs-border-color)',
        borderRadius: 'var(--bs-border-radius)',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    },
}

const teste = {
    "request": {
        "type": "City",
        "query": "Concordia, Brazil",
        "language": "en",
        "unit": "m"
    },
    "location": {
        "name": "Concordia",
        "country": "Brazil",
        "region": "Parana",
        "lat": "-25.933",
        "lon": "-51.100",
        "timezone_id": "America/Sao_Paulo",
        "localtime": "2025-08-15 22:20",
        "localtime_epoch": 1755296400,
        "utc_offset": "-3.0"
    },
    "current": {
        "observation_time": "01:20 AM",
        "temperature": 9,
        "weather_code": 143,
        "weather_icons": [
            "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0006_mist.png"
        ],
        "weather_descriptions": [
            "Mist"
        ],
        "astro": {
            "sunrise": "06:53 AM",
            "sunset": "06:05 PM",
            "moonrise": "No moonrise",
            "moonset": "10:47 AM",
            "moon_phase": "Waning Gibbous",
            "moon_illumination": 64
        },
        "air_quality": {
            "co": "225.7",
            "no2": "4.625",
            "o3": "51",
            "so2": "1.11",
            "pm2_5": "10.175",
            "pm10": "10.73",
            "us-epa-index": "1",
            "gb-defra-index": "1"
        },
        "wind_speed": 5,
        "wind_degree": 97,
        "wind_dir": "E",
        "pressure": 1025,
        "precip": 0,
        "humidity": 96,
        "cloudcover": 49,
        "feelslike": 9,
        "uv_index": 5,
        "visibility": 2,
        "is_day": "no"
    }
}

export function BuscaClimaAtual() {
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('concórdia')
    const [loading, setLoading] = useState(false)
    const [climaAtual, setClimaAtual] = useState(teste)

    const handleCEPChange = (cep) => {
        setCep(cep)
        if (cep.length === 8) {
            console.log(cep);
            buscarCidade(cep)
        }
    }

    const buscarCidade = async (cep) => {
        axios.get('/api/viacep/' + cep.replace('-', ''))
            .then(response => {
                setCidade(`${response.data.localidade}, ${response.data.uf}`)
            })
            .catch(error => {
                console.error('Erro ao buscar cidade pelo CEP:', error);
            });
    }

    const buscarClimaAtual = async () => {
        setLoading(true)
        const localidade = cidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        axios.get(`/api/weatherstack/current/?query=${localidade}, BR`)
            .then(response => {
                setClimaAtual(response.data)
                console.log(response.data, 'climaaaaa');
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar o clima atual:', error);
            });
    }

    const indiceUVData = (uvIndex) => {
        if (uvIndex <= 2) return { level: 'Baixo', color: 'green' };
        if (uvIndex <= 5) return { level: 'Moderado', color: 'yellow' };
        if (uvIndex <= 7) return { level: 'Alto', color: 'orange' };
        if (uvIndex <= 10) return { level: 'Muito Alto', color: 'red' };
        return { level: 'Extremo', color: 'purple' };
    }

    const pressaoData = (pressao) => {
        const nivel = pressao * 100 / 2000;

        if (pressao < 1000) return { level: 'Baixa', color: 'blue', width: `${nivel}%` };
        if (pressao < 1020) return { level: 'Normal', color: 'green', width: `${nivel}%` };
        if (pressao < 1030) return { level: 'Alta', color: 'orange', width: `${nivel}%` };
        return { level: 'Muito Alta', color: 'red', width: `${nivel}%`  };
    }

    const qualidadeArData = (qualidade) => {
        if (qualidade === '1') return { level: 'Bom', color: 'green', width: '16%' };
        if (qualidade === '2') return { level: 'Moderado ', color: 'green', width: '33%' };
        if (qualidade === '3') return { level: 'Nocivo para grupos sensíveis', color: 'green', width: '50%' };
        if (qualidade === '4') return { level: 'Nocivo', color: 'green', width: '66%' };
        if (qualidade === '5') return { level: 'Muito nocivo', color: 'green', width: '83%' };
        return { level: 'Perigoso', color: 'green', width: '100%' };
    }

    const retornarDirecaoVento = (dir) => {
        const direcao = compassRose.find(d => d.en === dir);
        return direcao ? direcao.pt : 'Desconhecido';
    }

    const retornarCodigoClima = (codigo) => {
        const clima = weatherCodes.find(c => c.code === codigo);
        return clima ? clima.pt : 'Desconhecido';
    }

    return (
    <div className='col-12'>
        <div className='row g-2'>
            <div className="col-12">
                <h1 className="text-center fs-2">Busque a previsão do tempo atual</h1>
            </div>
            <div className="col-md-5 col">
                <div>
                    <label htmlFor="cidade" className="form-label">CEP</label>
                    <InputCep
                        className="form-control"
                        placeholder="Informe o CEP"
                        name="cep"
                        aria-describedby="cepHelp"
                        onValueChange={handleCEPChange}
                        styles={styles}
                        disabled={loading}
                    />
                    <div id="cepHelp" className="form-text">Informe o CEP sem pontuação</div>
                </div>
            </div>
            <div className="col-md-5 col">
                <div>
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input type="text" readOnly className="form-control" id="cidade" value={cidade} />
                </div>
            </div>
            <div className="col align-content-center text-center d-grid">
                <button
                    type="button"
                    className="btn btn-success btn-full mt-1"
                    disabled={loading || cidade === ''}
                    onClick={buscarClimaAtual}
                >
                    Buscar
                </button>
            </div>
        </div>
        <div className='row g-2 mt-3'>
            <div className="col-12">
                {loading && <p>Carregando...</p>}
                {!loading && climaAtual && (
                    <div className="card shadow">
                        <div className="card-body">
                            <div className='row justify-between'>
                                <div className='col'>
                                    <h5 className="card-title">
                                        <i className='bi bi-geo-alt me-2' />{cidade}
                                    </h5>
                                </div>
                                <div className='col text-end'>
                                    <span className='fs-6 fw-light text-capitalize'>{moment(climaAtual.location.localtime).format('LLLL')}</span>
                                </div>
                            </div>
                            <div className='row justify-between py-3'>
                                <div className='col-md-3 text-left'>
                                    <span className='fs-1'>
                                        {climaAtual.current.temperature}°C
                                    </span>
                                    <p>{retornarCodigoClima(climaAtual.current.weather_code)}</p>
                                </div>
                                <div className='col'>
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=8&overlay=wind&product=ecmwf&level=surface&lat=${climaAtual.location.lat}&lon=${climaAtual.location.lon}`}
                                    >
                                    </iframe>
                                </div>
                            </div>
                            <div className='row justify-between g-2'>
                                <div className='col-md-4'>
                                    <div className="card boxinfo">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className='bi bi-sun-fill text-warning me-2' />Índice UV
                                            </h5>
                                            <p className="card-text">{indiceUVData(climaAtual.current.uv_index).level}</p>
                                            <div className="position-relative">
                                                <div className="progress" role="indicador uv" aria-label="indicador uv" aria-valuenow={climaAtual.current.uv_index} aria-valuemin="0" aria-valuemax="11">
                                                    <div className="progress-bar indice-bom-ruim p-2" style={{width: '100%'}}></div>
                                                </div>
                                                <span
                                                    className="shadow position-absolute top-50 translate-middle p-2 border rounded-circle"
                                                    style={{
                                                        left: climaAtual.current.uv_index === 11 ? '100%' : climaAtual.current.uv_index * 10 + '%',
                                                        backgroundColor: indiceUVData(climaAtual.current.uv_index).color,
                                                        '--bs-bg-opacity': '0.8',
                                                    }}
                                                >
                                                    <span className="visually-hidden">{climaAtual.current.uv_index}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card boxinfo">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className='bi bi-droplet-fill text-info me-2' />Umidade
                                            </h5>
                                            <p className="card-text">{climaAtual.current.humidity}%</p>
                                            <div className="progress" role="umidade" aria-label="umidade" aria-valuenow={climaAtual.current.humidity} aria-valuemin="0" aria-valuemax="100">
                                                <div className="progress-bar umidade" style={{width: `${climaAtual.current.humidity}%`}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card boxinfo">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className='bi bi-cloud-drizzle text-info me-2' />Precipitação
                                            </h5>
                                            <p className="card-text fw-bold fs-4 mt-4 pt-2">{climaAtual.current.precip}mm</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card boxinfo">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className='bi bi-arrows-collapse text me-2' />Pressão
                                            </h5>
                                            <p className="card-text">{climaAtual.current.pressure} mb ({pressaoData(climaAtual.current.pressure).level})</p>
                                            <div className="position-relative">
                                                <div className="progress" role="s" aria-label="s" aria-valuenow={climaAtual.current.pressure}>
                                                    <div className="progress-bar pressao w-100 p-2" style={{width: '100%'}}></div>
                                                </div>
                                                <span
                                                    className="shadow position-absolute top-50 translate-middle p-2 border bg-secondary rounded-circle"
                                                    style={{
                                                        left: pressaoData(climaAtual.current.pressure).width,
                                                    }}
                                                >
                                                    <span className="visually-hidden">{climaAtual.current.pressure}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card boxinfo">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className='bi bi-cloud-check-fill text-success me-2' />Qualidade do ar
                                            </h5>
                                            <p className="card-text">{qualidadeArData(climaAtual.current.air_quality['us-epa-index']).level}</p>
                                            <div className="position-relative">
                                                <div className="progress" role="indicador uv" aria-label="indicador uv" aria-valuenow={climaAtual.current.air_quality['us-epa-index']} aria-valuemin="1" aria-valuemax="6">
                                                    <div className="progress-bar indice-bom-ruim p-2" style={{width: '100%'}}></div>
                                                </div>
                                                <span
                                                    className="shadow position-absolute top-50 translate-middle p-2 border rounded-circle"
                                                    style={{
                                                        left: qualidadeArData(climaAtual.current.air_quality['us-epa-index']).width,
                                                        backgroundColor: indiceUVData(climaAtual.current.air_quality['us-epa-index']).color,
                                                        '--bs-bg-opacity': '0.8',
                                                    }}
                                                >
                                                    <span className="visually-hidden">{climaAtual.current.air_quality['us-epa-index']}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="card boxinfo">
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                <i className='bi bi-wind text-secondary me-2' />Vento
                                            </h5>
                                            <p className="card-text">Velocidade: {climaAtual.current.wind_speed}km/h</p>
                                            <p className="card-text">
                                                {retornarDirecaoVento(climaAtual.current.wind_dir)}
                                                <svg style={{ transform: `rotate(${climaAtual.current.wind_degree}deg)` }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up mx-2" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                                </svg>
                                                {climaAtual.current.wind_degree}º
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

const BuscaClimaAtualroot = createRoot(document.getElementById('busca-clima-atual'));
BuscaClimaAtualroot.render(<BuscaClimaAtual />);
