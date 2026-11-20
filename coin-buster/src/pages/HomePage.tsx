import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCryptoPrices } from '../services/cryptoService';
import { CryptoItem, FormFilterData } from '../types/crypto';
import { Controls } from '../components/Controls';
import { StatusMessage } from '../components/StatusMessage';
import { CryptoList } from '../components/CryptoList';
import { useFavoritesStore } from '../store/useFavoritesStore';

export const HomePage: React.FC = () => {
  const [data, setData] = useState<CryptoItem[]>([]);
  const [status, setStatus] = useState<'initial' | 'loading' | 'empty' | 'error' | 'success'>('initial');
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<FormFilterData | null>(null);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  // Referencia para controlar la vigencia de la consulta (Consigna 3)
  const latestRequestRef = useRef(0);

  // Selector de favoritos (dato derivado para la cantidad)
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const favoritesCount = favoriteIds.length;

  const loadData = useCallback(async () => {
    const requestId = ++latestRequestRef.current;
    setStatus('loading');
    setErrorMessage('');

    if (simulateEmpty) {
      setTimeout(() => {
        if (requestId !== latestRequestRef.current) return;
        setData([]);
        setStatus('empty');
      }, 300);
      return;
    }

    try {
      const result = await fetchCryptoPrices();
      // Si se inició otra consulta más reciente, descartamos este resultado
      if (requestId !== latestRequestRef.current) return;

      setData(result);
      setStatus(result.length === 0 ? 'empty' : 'success');
    } catch (err) {
      if (requestId !== latestRequestRef.current) return;
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Error desconocido');
    }
  }, [simulateEmpty]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredItems = data.filter((item) => {
    if (!filter?.searchQuery) return true;
    return item.name.toLowerCase().includes(filter.searchQuery.toLowerCase());
  });

  const totalResults = filteredItems.length;

  return (
    <div>
      <div className="alert alert-info" role="status">
        <span>⭐ <strong>Criptomonedas favoritas guardadas:</strong> {favoritesCount}</span>
      </div>

      <Controls
        onSearch={(formData) => setFilter(formData)}
        onToggleSimulateEmpty={setSimulateEmpty}
        simulateEmpty={simulateEmpty}
      />

      <StatusMessage
        status={status === 'success' && totalResults === 0 ? 'empty' : status}
        errorMessage={errorMessage}
        onRetry={loadData}
      />

      {status === 'success' && totalResults > 0 && (
        <section aria-labelledby="sec-listado">
          <h2 id="sec-listado">Cotizaciones Disponibles ({totalResults})</h2>
          <CryptoList items={filteredItems} />
        </section>
      )}
    </div>
  );
};