import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputCep } from 'react-input-cep'
import axios from 'axios';

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

export function BuscaClimaAtual() {
    const [cep, setCep] = useState('')
    const [cidade, setCidade] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCEPChange = (cep) => {
        setCep(cep)
        if (cep.length === 8) {
            console.log(cep);
            buscarCidade(cep)
        }
    }

    const buscarCidade = async (cep) => {
        setLoading(true)
        axios.get('/api/viacep/' + cep.replace('-', ''))
            .then(response => {
                setCidade(`${response.data.localidade}, ${response.data.uf}`)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar cidade pelo CEP:', error);
            });
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
                >
                    Buscar
                </button>
            </div>
        </div>
    </div>
  );
}

const BuscaClimaAtualroot = createRoot(document.getElementById('busca-clima-atual'));
BuscaClimaAtualroot.render(<BuscaClimaAtual />);
