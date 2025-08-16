import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
moment.locale('pt-br')

export function Historico() {
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscaHistorico = async () => {
        setLoading(true)

        axios.get(`/api/historico`)
            .then(response => {
                setHistorico(response.data);
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar histórico:', error);
            });
    }

    useEffect(() => {
        buscaHistorico();
    }, []);

    return (
        <div className='g-2 row'>
            <div className="col-12">
                <h1 className="text-center fs-2">Histórico de pesquisa</h1>
            </div>
            {!loading && historico.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Nenhuma pesquisa realizada.
                </div>
            )}

            {historico.map((item, index) => (
                <div key={item.id} className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className='row g-2 align-items-center'>
                                <div className='col-9'>
                                    <h5 className="card-title">{item.cidade}, {item.uf} - {item.cep}</h5>
                                    <p className="card-text fw-light">Data da consulta: {moment(item.created_at).format('LLLL')}</p>
                                </div>
                                <div className='col-3'>
                                    <a href={`/?cep=${item.cep}`} >
                                        <button className="btn btn-primary w-100 mb-2" type="button">
                                            <i className="bi bi-arrow-clockwise"></i> Repetir
                                        </button>
                                    </a>
                                    <button className="btn btn-success w-100" type="button">
                                        <i className="bi bi-arrow-left-right"></i> Comparar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

if (document.getElementById('historico')) {
    const Historicoroot = createRoot(document.getElementById('historico'));
    Historicoroot.render(<Historico />);
}
