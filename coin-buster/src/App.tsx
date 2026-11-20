import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Coin-Buster
          </Link>
        </h1>
        <p>Monitoreo financiero con arquitectura en React + TypeScript</p>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/criptomonedas/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer>
        <p>Juan Carlos de la Vega | Tecnicatura Superior en Programación</p>
        <p>Fuente de datos: CoinGecko API</p>
      </footer>
    </div>
  );
};

export default App;