import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputCep } from 'react-input-cep'
import axios from 'axios';
import ClimaCard from '../ClimaCard'

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
                setLoading(false)
                salvaHistorico()
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar o clima atual:', error);
            });
    }

    const salvaHistorico = async () => {
        const data = {
            cep,
            cidade: cidade.split(', ')[0],
            uf: cidade.split(', ')[1],
        }
        axios.post(`/api/historico/novo/`, data)
            .then(response => {
                console.log('Historico salvo com sucesso:', response.data);})
            .catch(error => {
                console.error('Erro ao salvar o historico:', error);
            });
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const cepParam = urlParams.get('cep');
        if (cepParam) {
            handleCEPChange(cepParam);
        }
    }, []);

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
                        value={cep}
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
                    className="btn btn-primary btn-full mt-1"
                    disabled={loading || cidade === ''}
                    onClick={buscarClimaAtual}
                >
                    Buscar
                </button>
            </div>
        </div>
        <div className='row g-2 mt-3 mb-3'>
            <div className="col-12">
                {loading && <p>Carregando...</p>}
                {!loading && climaAtual && (
                    <ClimaCard cidade={cidade} clima={climaAtual} action={'save'} />
                )}
            </div>
        </div>
    </div>
  );
}

if (document.getElementById('busca-clima-atual')) {
    const BuscaClimaAtualroot = createRoot(document.getElementById('busca-clima-atual'));
    BuscaClimaAtualroot.render(<BuscaClimaAtual />);
}
