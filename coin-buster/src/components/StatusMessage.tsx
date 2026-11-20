import React from 'react';

interface StatusMessageProps {
  status: 'initial' | 'loading' | 'empty' | 'error' | 'success';
  errorMessage?: string;
  onRetry?: () => void;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ status, errorMessage, onRetry }) => {
  if (status === 'initial') {
    return (
      <div className="alert alert-info" role="status">
        ℹ️ <strong>Estado Inicial:</strong> Aplica un filtro para comenzar.
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="alert alert-info" role="status">
        ⏳ <strong>Cargando:</strong> Consultando la API pública...
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="alert alert-info" role="status">
        📭 <strong>Sin Resultados:</strong> No se encontraron criptomonedas.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="alert alert-danger" role="alert">
        <div>⚠️ <strong>Error:</strong> {errorMessage || 'Ocurrió un problema.'}</div>
        {onRetry && <button type="button" onClick={onRetry}>Reintentar</button>}
      </div>
    );
  }

  return null;
};