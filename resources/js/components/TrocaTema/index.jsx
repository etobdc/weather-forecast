import { useState } from 'react';
import { createRoot } from 'react-dom/client';

let temaAtual = localStorage.getItem('theme') || 'ligth';

export function TrocaTema() {
    const [tema, setTema] = useState(temaAtual);

    const alteraTemaSite = () => {
        setTema(tema === 'dark' ? 'ligth' : 'dark');
        setTheme(tema === 'dark' ? 'ligth' : 'dark');
    }

    return (
        <div className='position-absolute'>
            <button
                onClick={() => alteraTemaSite()}
                className='position-fixed top-0 end-0 m-2 btn btn-outline-primary rounded-circle troca-tema'
            >
                {tema === 'dark' && <i className="bi bi-brightness-high"></i>}
                {tema === 'ligth' && <i className="bi bi-moon-stars"></i>}
            </button>
        </div>
    );
}

if (document.getElementById('troca-tema')) {
    const TrocaTemaRoot = createRoot(document.getElementById('troca-tema'));
    TrocaTemaRoot.render(<TrocaTema />);
}
