import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCryptoPrices } from '../services/cryptoService';
import { CryptoItem } from '../types/crypto';
import { useFavoritesStore } from '../store/useFavoritesStore';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<CryptoItem | null>(null);
  const [loading, setLoading] = useState(true);

  const normalizedId = id?.toLowerCase() || '';
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(normalizedId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  useEffect(() => {
    let isCurrent = true;
    async function getDetail() {
      try {
        const list = await fetchCryptoPrices();
        if (!isCurrent) return;
        const found = list.find((c) => c.id === normalizedId);
        setItem(found || null);
      } catch {
        if (!isCurrent) return;
        setItem(null);
      } finally {
        if (isCurrent) setLoading(false);
      }
    }
    getDetail();
    return () => {
      isCurrent = false;
    };
  }, [normalizedId]);

  if (loading) return <div className="alert alert-info">Cargando detalle de la criptomoneda...</div>;

  if (!item) {
    return (
      <div className="alert alert-danger">
        <h2>Recurso no encontrado</h2>
        <p>La criptomoneda <strong>{id}</strong> no existe o no está disponible.</p>
        <Link to="/" className="btn-link">← Volver al inicio</Link>
      </div>
    );
  }

  return (
    <article className="detail-card">
      <h2>
        Detalle de {item.name} {isFavorite ? '⭐' : ''}
      </h2>
      <p><strong>Identificador API:</strong> {item.id}</p>
      <p><strong>Precio actual en USD:</strong> ${item.priceUsd.toLocaleString()}</p>
      <p><strong>Estado en favoritos:</strong> {isFavorite ? 'Marcada como favorita' : 'No marcada'}</p>

      <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => toggleFavorite(item.id)}
          className="btn-secondary"
          aria-pressed={isFavorite}
        >
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
        <Link to="/" className="btn-link">← Volver a la lista de cotizaciones</Link>
      </div>
    </article>
  );
};