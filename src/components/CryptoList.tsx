import React from 'react';
import { CryptoItem } from '../types/crypto';
import { CryptoCard } from './CryptoCard';

interface CryptoListProps {
  items: CryptoItem[];
}

export const CryptoList: React.FC<CryptoListProps> = ({ items }) => {
  return (
    <div className="cards-grid">
      {items.map((item) => (
        <CryptoCard key={item.id} item={item} />
      ))}
    </div>
  );
};