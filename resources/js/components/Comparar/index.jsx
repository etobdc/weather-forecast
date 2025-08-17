import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputCep } from 'react-input-cep'
import Select from 'react-select'
import ClimaCard from '../ClimaCard'
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

export function Comparar() {
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cep, setCep] = useState('')
    const [cep2, setCep2] = useState('')
    const [cidade, setCidade] = useState('')
    const [cidade2, setCidade2] = useState('')
    const [cidadeSalva, setCidadeSalva] = useState('')
    const [cidadeSalva2, setCidadeSalva2] = useState('')
    const [previsao1, setPrevisao1] = useState(null);
    const [previsao2, setPrevisao2] = useState(null);

    const handleCEPChange = (cep, indicador) => {
        if (indicador === 1) setCep(cep)
        if (indicador === 2) setCep2(cep)

        if (cep.length === 8) {
            buscarCidade(cep, indicador)
        }
    }

    const buscarCidade = async (cep, indicador) => {
        axios.get('/api/viacep/' + cep.replace('-', ''))
            .then(response => {
                const local = `${response.data.localidade}, ${response.data.uf}`
                if (indicador === 1) setCidade(local)
                if (indicador === 2) setCidade2(local)

            })
            .catch(error => {
                console.error('Erro ao buscar cidade pelo CEP:', error);
            });
    }

    const buscarClimaAtual = async () => {
        setLoading(true)
        const localidade = cidade.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const localidade2 = cidade2.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        axios.get(`/api/weatherstack/current/?query=${localidade}, BR`)
            .then(response => {
                setPrevisao1(response.data)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar o clima atual:', error);
            });

        axios.get(`/api/weatherstack/current/?query=${localidade2}, BR`)
            .then(response => {
                setPrevisao2(response.data)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar o clima atual:', error);
            });
    }

    const buscaHistorico = async () => {
        setLoading(true)

        axios.get(`/api/historico/unicos`)
            .then(response => {
                let options = [];
                response.data.forEach(item => {
                    options.push({
                        value: item.id,
                        label: `${item.cidade}, ${item.uf}, ${item.cep}`,
                        ...item
                    });
                });

                setHistorico(options);
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar histórico:', error);
            });
    }

    const alterarCidadeSalva = (option, indicador) => {
        if (indicador === 1) {
            setCidadeSalva(option);
            setCep(option.cep)
            setCidade(`${option.cidade}, ${option.uf}`);
        }
        if (indicador === 2) {
            setCidadeSalva2(option);
            setCep2(option.cep)
            setCidade2(`${option.cidade}, ${option.uf}`);
        }
    }

    useEffect(() => {
        buscaHistorico();
    }, []);

    return (
        <>
            <div className="container-sm margin-central">
                <div className='g-2 row'>
                    <div className="col-12">
                        <h1 className="text-center fs-2">Compare cidades</h1>
                        <p className="">Selecione duas cidades para comparar o clima atual. Escolha uma das cidades presentes no hisórico ou informe o cep das cidades que desja comparar.</p>
                    </div>
                    {historico.length > 0 && (
                        <div className="col-12 col-sm-6 col">
                            <label htmlFor="cidade" className="form-label">Histórico</label>
                            <Select
                                options={historico}
                                placeholder="Cidade salva"
                                classNamePrefix="form-control"
                                isClearable
                                value={cidadeSalva}
                                onChange={(option) => alterarCidadeSalva(option, 1)}
                            />
                            <Select
                                options={historico}
                                placeholder="Cidade salva"
                                classNamePrefix="form-control"
                                className='mt-2'
                                isClearable
                                value={cidadeSalva2}
                                onChange={(option) => alterarCidadeSalva(option, 2)}
                            />
                        </div>
                    )}
                    <div className="col-md-3 col">
                        <div>
                            <label htmlFor="cidade" className="form-label">CEP</label>
                            <InputCep
                                className="form-control"
                                placeholder="Informe o CEP"
                                name="cep"
                                aria-describedby="cepHelp"
                                onValueChange={(cep) => handleCEPChange(cep, 1)}
                                styles={styles}
                                disabled={loading}
                                value={cep}
                            />
                        </div>
                        <div className='mt-2'>
                            <InputCep
                                className="form-control"
                                placeholder="Informe o CEP"
                                name="cep"
                                aria-describedby="cepHelp"
                                onValueChange={(cep) => handleCEPChange(cep, 2)}
                                styles={styles}
                                disabled={loading}
                                value={cep2}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 col">
                        <div>
                            <label htmlFor="cidade" className="form-label">Cidade</label>
                            <input placeholder="Cidade" type="text" readOnly className="form-control" id="cidade" value={cidade} />
                        </div>
                        <div className='mt-2'>
                            <input placeholder="Cidade" type="text" readOnly className="form-control" id="cidade" value={cidade2} />
                        </div>
                    </div>
                </div>
                <div className="col align-content-center text-center d-grid">
                    <button
                        type="button"
                        className="btn btn-primary btn-full mt-3"
                        disabled={loading || cidade === ''}
                        onClick={buscarClimaAtual}
                    >
                        Comparar cidades
                    </button>
                </div>
            </div>
            <div className='container-md'>
                <div className='row g-2 mt-3 mb-3'>
                    <div className="col-12 col-md-6">
                        {loading && <p>Carregando...</p>}
                        {!loading && previsao1 && (
                            <ClimaCard cidade={cidade} clima={previsao1} action={'save'} />
                        )}
                    </div>
                    <div className="col-12 col-md-6">
                        {loading && <p>Carregando...</p>}
                        {!loading && previsao2 && (
                            <ClimaCard cidade={cidade2} clima={previsao2} action={'save'} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

if (document.getElementById('comparar')) {
    const Compararroot = createRoot(document.getElementById('comparar'));
    Compararroot.render(<Comparar />);
}
