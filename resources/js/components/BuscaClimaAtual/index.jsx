import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { InputCep } from 'react-input-cep'

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
    const [isCepLoading, setIsCepLoading] = useState(false)
    const [cepData, setCepData] = useState({})
    const [cep, setCep] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

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
                        onValueChange={value => setCep(value)}
                        onLoading={(loadingStatus) => setIsCepLoading(loadingStatus)}
                        onCepDataFetch={data => setCepData(data)}
                        disabled={isCepLoading}
                        errorMsg={errorMsg}
                        styles={styles}
                    />
                    <div id="cepHelp" className="form-text">Informe o CEP sem pontuação</div>
                </div>
            </div>
            <div className="col-md-5 col">
                <div>
                    <label htmlFor="cidade" className="form-label">Cidade</label>
                    <input type="text" readOnly className="form-control" id="cidade" />
                </div>
            </div>
            <div className="col align-content-center text-center d-grid">
                <button type="button" className="btn btn-success btn-full mt-1">Buscar</button>
            </div>
        </div>
    </div>
  );
}

const BuscaClimaAtualroot = createRoot(document.getElementById('busca-clima-atual'));
BuscaClimaAtualroot.render(<BuscaClimaAtual />);
