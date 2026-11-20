import { RawApiResponse, CryptoItem } from '../types/crypto';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

export async function fetchCryptoPrices(): Promise<CryptoItem[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status} - No se pudo conectar con CoinGecko`);
  }

  const data: RawApiResponse = await response.json();

  return Object.entries(data).map(([id, details]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    priceUsd: details.usd,
  }));
}