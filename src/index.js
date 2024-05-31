import React from 'react';
import ReactDOM from 'react-dom/client';

import Rotas from "./rotas.js";
import { CardProvider } from './contexts/cartContext.jsx';

import "./style/global.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // o contexto envolvendo toda a aplicação
  <CardProvider>
    <Rotas />
  </CardProvider>
);
