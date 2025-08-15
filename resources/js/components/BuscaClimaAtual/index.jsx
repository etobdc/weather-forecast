import React from 'react';
import { createRoot } from 'react-dom/client';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'

export function BuscaClimaAtual() {
  return (
    <div className='col-12'>
        <div className="col-12">
            <h1 className="text-center text-lg text-blue-600 dark:text-sky-400">Busque a previsão do tempo atual</h1>
        </div>
        {/* <div className="col-span-5">
            <div className={`w-full max-w-sm`}>
                <label htmlFor="cep" className="mb-1 block text-sm font-medium text-gray-700">
                    CEP
                </label>
            </div>
            <div
                className={`relative flex items-center rounded-2xl border bg-white shadow-sm focus-within:ring-2 focus-within:ring-offset-0 ${
                valid
                    ? "border-gray-300 focus-within:ring-gray-300"
                    : "border-gray-300 focus-within:ring-indigo-500"
                }`}
            >
                <span className="pointer-events-none pl-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>

                <input
                    id="cep"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className={`peer w-full rounded-2xl bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none ${
                        disabled ? "cursor-not-allowed opacity-60" : ""
                    }`}
                    placeholder="Digite o CEP da cidade"
                    value={val}
                    // onChange={handleChange}
                    // onKeyDown={handleKeyDown}
                    // onBlur={handleBlur}
                    disabled={disabled}
                    autoFocus
                    required
                    aria-invalid={!valid}
                    aria-describedby={`${inputId}-hint ${inputId}-error`}
                />

                {val && (
                    <button
                        type="button"
                        onClick={clear}
                        className="mr-2 inline-flex items-center rounded-xl p-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Limpar CEP"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-400" />
                    </button>
                )}
            </div>
            <div className="mt-1 flex items-start justify-between">
                <p id="cep-hint" className="text-xs text-gray-500">
                    Digite 8 dígitos. Ex.: 01001-000
                </p>
                {!valid && val.length > 0 && (
                <span id={`${inputId}-error`} className="inline-flex items-center gap-1 text-xs text-red-600">
                    <ExclamationCircleIcon className="h-4 w-4" /> CEP inválido
                </span>
                )}
            </div>
        </div>
        <div className="col-span-5">01</div>
        <div className="col-span-2">02</div> */}
    </div>
  );
}

const BuscaClimaAtualroot = createRoot(document.getElementById('busca-clima-atual'));
BuscaClimaAtualroot.render(<BuscaClimaAtual />);
