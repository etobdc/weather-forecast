import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

let temaAtual = localStorage.getItem('tema') || 'ligth';

export function TrocaTema() {
    const [tema, setTema] = useState(temaAtual);

    const alteraTemaSite = () => {
        setTema(tema === 'dark' ? 'ligth' : 'dark');
        trocaTema();
    }

    return (
        <button
            onClick={() => alteraTemaSite()}
            className='p-1 text-blue-500 rounded-full bg-white dark:bg-slate-800 border-1 fixed top-5 right-5 cursor-pointer hover:bg-gray-700'
        >
            {tema === 'dark' && <SunIcon className="size-4"/>}
            {tema === 'ligth' && <MoonIcon className="size-4"/>}
        </button>
    );
}

const TrocaTemaRoot = createRoot(document.getElementById('troca-tema'));
TrocaTemaRoot.render(<TrocaTema />);
