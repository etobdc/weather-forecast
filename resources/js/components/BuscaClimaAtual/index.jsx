import React from 'react';
import { createRoot } from 'react-dom/client';

export function BuscaClimaAtual({counter}) {
  return (
    <div>
      <h1>Hello, world! {counter}</h1>
      <input placeholder="Type something here" />
    </div>
  );
}

const domNode = document.getElementById('busca-clima-atual');
const root = createRoot(domNode);
root.render(<BuscaClimaAtual counter={10} />);
