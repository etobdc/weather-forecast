import { useState } from 'react';
import axios from 'axios';
import compassRose from './compassRose.js';
import weatherCodes from './weatherCodes.js';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
moment.locale('pt-br')

function ClimaCard({ cidade, clima, action, previsaoId }) {
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState('Previsão salva com sucesso!');
    const [toastStatus, setToastStatus] = useState('text-bg-primary');

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

    const salvaPrevisao = async () => {
        setLoading(true)

        const data = {
            response_json: JSON.stringify(clima)
        }

        axios.post(`/api/previsao/novo`, data)
            .then(response => {
                setLoading(false)
                setToastStatus('text-bg-success')
                setToastMsg(response.data.message || 'Previsão salva com sucesso!')
                const toast = new bootstrap.Toast(document.getElementById('alert'));
                toast.show();
            })
            .catch(error => {
                setLoading(false)
                setToastStatus('text-bg-danger')
                setToastMsg(error.response?.data?.message || 'Erro ao salvar previsão.')
                const toast = new bootstrap.Toast(document.getElementById('alert'));
                toast.show();
                console.error('Erro ao salvar previsao:', error);
            });
    }

    const excluiPrevisao = async () => {
        setLoading(true)

        axios.delete(`/api/previsao/remove/${previsaoId}`)
            .then(response => {
                const myModalAlternative = new bootstrap.Modal('#modalAlerta')
                myModalAlternative.hide();
                setLoading(false)
                setToastStatus('text-bg-success')
                setToastMsg(response.data.message || 'Previsão excluída com sucesso!')
                const toast = new bootstrap.Toast(document.getElementById('alert'));
                toast.show();
                window.location.reload(); // Recarrega a página para atualizar a lista de previsões salvas
            })
            .catch(error => {
                const myModalAlternative = new bootstrap.Modal('#modalAlerta')
                myModalAlternative.hide();
                setLoading(false)
                setToastStatus('text-bg-danger')
                setToastMsg(error.response?.data?.message || 'Erro ao excluir previsão.')
                const toast = new bootstrap.Toast(document.getElementById('alert'));
                toast.show();
                console.error('Erro ao excluir previsao:', error);
            });
    }

    const validaexcluiPrevisao = () => {
        const myModalAlternative = new bootstrap.Modal('#modalAlerta')
        myModalAlternative.show();
    }

    return (
        <>
            <div className="card shadow boxprevisao">
                <div className="card-body">
                    <div className='row justify-between'>
                        <div className='col'>
                            <h5 className="card-title">
                                <i className='bi bi-geo-alt me-2' />{cidade}
                            </h5>
                            <span className='fs-6 fw-light text-capitalize'>{moment(clima.location.localtime).format('LLLL')}</span>
                        </div>
                        <div className='col text-end'>
                            {action === 'delete' && (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-full mt-1"
                                    disabled={loading}
                                    onClick={validaexcluiPrevisao}
                                >
                                    Excluir previsão
                                </button>
                            )}
                            {action === 'save' && (
                                <button
                                    type="button"
                                    className="btn btn-success btn-full mt-1"
                                    disabled={loading}
                                    onClick={salvaPrevisao}
                                >
                                    Salvar previsão
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='row justify-between py-3 align-items-center'>
                        <div className='col-md-3 text-center py-2'>
                            <div>
                                <img src={clima.current.weather_icons[0]} alt="" />
                            </div>
                            <span className='fs-1'>
                                {clima.current.temperature}°C
                            </span>
                            <p>{retornarCodigoClima(clima.current.weather_code)}</p>
                        </div>
                        <div className='col rounded'>
                            <iframe
                                className='rounded'
                                width="100%"
                                height="200"
                                src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=8&overlay=wind&product=ecmwf&level=surface&lat=${clima.location.lat}&lon=${clima.location.lon}`}
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
                                    <p className="card-text">{indiceUVData(clima.current.uv_index).level}</p>
                                    <div className="position-relative">
                                        <div className="progress" role="indicador uv" aria-label="indicador uv" aria-valuenow={clima.current.uv_index} aria-valuemin="0" aria-valuemax="11">
                                            <div className="progress-bar indice-bom-ruim p-2" style={{width: '100%'}}></div>
                                        </div>
                                        <span
                                            className="shadow position-absolute top-50 translate-middle p-2 border rounded-circle"
                                            style={{
                                                left: clima.current.uv_index === 11 ? '100%' : clima.current.uv_index * 10 + '%',
                                                backgroundColor: indiceUVData(clima.current.uv_index).color,
                                                '--bs-bg-opacity': '0.8',
                                            }}
                                        >
                                            <span className="visually-hidden">{clima.current.uv_index}</span>
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
                                    <p className="card-text">{clima.current.humidity}%</p>
                                    <div className="progress" role="umidade" aria-label="umidade" aria-valuenow={clima.current.humidity} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar umidade" style={{width: `${clima.current.humidity}%`}}></div>
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
                                    <p className="card-text fw-bold fs-4 mt-4 pt-2">{clima.current.precip}mm</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className="card boxinfo">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className='bi bi-arrows-collapse text me-2' />Pressão
                                    </h5>
                                    <p className="card-text">{clima.current.pressure} mb ({pressaoData(clima.current.pressure).level})</p>
                                    <div className="position-relative">
                                        <div className="progress" role="s" aria-label="s" aria-valuenow={clima.current.pressure}>
                                            <div className="progress-bar pressao w-100 p-2" style={{width: '100%'}}></div>
                                        </div>
                                        <span
                                            className="shadow position-absolute top-50 translate-middle p-2 border bg-secondary rounded-circle"
                                            style={{
                                                left: pressaoData(clima.current.pressure).width,
                                            }}
                                        >
                                            <span className="visually-hidden">{clima.current.pressure}</span>
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
                                    <p className="card-text">{qualidadeArData(clima.current.air_quality['us-epa-index']).level}</p>
                                    <div className="position-relative">
                                        <div className="progress" role="indicador uv" aria-label="indicador uv" aria-valuenow={clima.current.air_quality['us-epa-index']} aria-valuemin="1" aria-valuemax="6">
                                            <div className="progress-bar indice-bom-ruim p-2" style={{width: '100%'}}></div>
                                        </div>
                                        <span
                                            className="shadow position-absolute top-50 translate-middle p-2 border rounded-circle"
                                            style={{
                                                left: qualidadeArData(clima.current.air_quality['us-epa-index']).width,
                                                backgroundColor: indiceUVData(clima.current.air_quality['us-epa-index']).color,
                                                '--bs-bg-opacity': '0.8',
                                            }}
                                        >
                                            <span className="visually-hidden">{clima.current.air_quality['us-epa-index']}</span>
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
                                    <p className="card-text">Velocidade: {clima.current.wind_speed}km/h</p>
                                    <p className="card-text">
                                        {retornarDirecaoVento(clima.current.wind_dir)}
                                        <svg style={{ transform: `rotate(${clima.current.wind_degree}deg)` }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up mx-2" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                        </svg>
                                        {clima.current.wind_degree}º
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="toast-container position-fixed bottom-0 end-0 p-3 ">
                <div id='alert' className={`toast align-items-center text-bg-primary border-0 ${toastStatus}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {toastMsg}
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalAlerta" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Excluir previsão</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Esta ação não poderá ser desfeita. Tem certeza que deseja excluir esta previsão?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={excluiPrevisao}>Sim, excluir</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClimaCard;
