import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import * as cryptoService from '../services/cryptoService';
import { useFavoritesStore } from '../store/useFavoritesStore';

describe('Coin-Buster - Pruebas de comportamiento observable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Limpiamos el store y localStorage antes de cada test
    useFavoritesStore.setState({ favoriteIds: [] });
    localStorage.clear();
  });

  it('Caso B y A: muestra estado de carga, luego los resultados y permite marcar/desmarcar favoritos', async () => {
    const user = userEvent.setup();

    vi.spyOn(cryptoService, 'fetchCryptoPrices').mockResolvedValueOnce([
      { id: 'bitcoin', name: 'Bitcoin', priceUsd: 64000 },
      { id: 'solana', name: 'Solana', priceUsd: 150 },
    ]);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // 1. Comprobar estado de carga inicial
    expect(screen.getByText(/Consultando la API pública/i)).toBeInTheDocument();

    // 2. Esperar a que aparezcan los resultados
    expect(await screen.findByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('Solana')).toBeInTheDocument();

    // 3. Marcar Bitcoin como favorito mediante rol accesible
    const addButtons = screen.getAllByRole('button', { name: /Agregar a favoritos/i });
    await user.click(addButtons[0]);

    // Verificar cambio visual en el botón y en el contador
// Verificar cambio visual en el botón y en el contador (buscando por el rol status del contenedor padre)
    expect(screen.getByRole('button', { name: /Quitar de favoritos/i })).toBeInTheDocument();
    const statusBanner = screen.getAllByRole('status')[0];
    expect(statusBanner).toHaveTextContent('Criptomonedas favoritas guardadas: 1');

    // 4. Desmarcar el favorito
    await user.click(screen.getByRole('button', { name: /Quitar de favoritos/i }));
    expect(statusBanner).toHaveTextContent('Criptomonedas favoritas guardadas: 0');  
});

  it('Caso C: muestra mensaje de error y permite reintentar la consulta', async () => {
    const user = userEvent.setup();

    const fetchSpy = vi
      .spyOn(cryptoService, 'fetchCryptoPrices')
      .mockRejectedValueOnce(new Error('Fallo de conexión con el servidor'))
      .mockResolvedValueOnce([{ id: 'ethereum', name: 'Ethereum', priceUsd: 3200 }]);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // 1. Verificar aparición del mensaje de error y botón Reintentar
    expect(await screen.findByText(/Fallo de conexión con el servidor/i)).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: /Reintentar/i });

    // 2. Pulsar Reintentar y comprobar recuperación
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText('Ethereum')).toBeInTheDocument();
    });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});