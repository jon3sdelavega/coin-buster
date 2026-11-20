import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => (
  <section className="alert alert-danger">
    <h2>404 - Página no encontrada</h2>
    <p>La ruta solicitada no existe en Coin-Buster.</p>
    <Link to="/" className="btn-link">Volver al inicio</Link>
  </section>
);