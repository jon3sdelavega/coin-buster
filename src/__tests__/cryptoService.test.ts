import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCryptoPrices } from '../services/cryptoService';

describe('cryptoService - fetchCryptoPrices', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('devuelve los datos transformados correctamente cuando la respuesta HTTP es exitosa', async () => {
    const mockApiResponse = {
      bitcoin: { usd: 65000 },
      ethereum: { usd: 3500 },
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    const result = await fetchCryptoPrices();

    expect(result).toEqual([
      { id: 'bitcoin', name: 'Bitcoin', priceUsd: 65000 },
      { id: 'ethereum', name: 'Ethereum', priceUsd: 3500 },
    ]);
  });

  it('lanza un error cuando la respuesta HTTP tiene ok: false', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    await expect(fetchCryptoPrices()).rejects.toThrow('Error HTTP: 500');
  });
});