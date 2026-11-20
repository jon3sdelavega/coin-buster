import React from 'react';
import { Link } from 'react-router-dom';
import { CryptoItem } from '../types/crypto';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { formatUsdPrice } from '../utils/formatters';

interface CryptoCardProps {
  item: CryptoItem;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ item }) => {
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(item.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article className={`card ${isFavorite ? 'pinned' : ''}`}>
      <h3>
        {item.name} {isFavorite ? '⭐' : ''}
      </h3>
      <p>{formatUsdPrice(item.priceUsd)}</p>
      <div className="card-actions">
        <button
          type="button"
          onClick={() => toggleFavorite(item.id)}
          className="btn-secondary"
          aria-pressed={isFavorite}
        >
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
        <Link to={`/criptomonedas/${item.id}`} className="btn-link">
          Ver Detalle →
        </Link>
      </div>
    </article>
  );
};