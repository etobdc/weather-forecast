import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import ClimaCard from '../ClimaCard'

export function PrevisoesSalvas() {
    const [previsoes, setPrevisoes] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscaPrevisoesSalvas = async () => {
        setLoading(true)

        axios.get(`/api/previsao`)
            .then(response => {
                setPrevisoes(response.data);
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar previsões:', error);
            });
    }

    useEffect(() => {
        buscaPrevisoesSalvas();
    }, []);

    return (
        <div className='g-2 row'>
            {!loading && previsoes.length === 0 && (
                <div className="alert alert-info" role="alert">
                    Nenhuma previsão salva.
                </div>
            )}
            {previsoes.map((previsao, index) => (
                <ClimaCard key={previsao.id} cidade={previsao.localidade} clima={JSON.parse(JSON.parse(previsao.response_json))} action={'delete'} previsaoId={previsao.id}/>
            ))}
        </div>
    );
}

if (document.getElementById('previsoes-salvas')) {
    const PrevisoesSalvasroot = createRoot(document.getElementById('previsoes-salvas'));
    PrevisoesSalvasroot.render(<PrevisoesSalvas />);
}
