import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      toggleFavorite: (id: string) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((item) => item !== id)
            : [...state.favoriteIds, id],
        })),
    }),
    {
      name: 'coin-buster-favorites', // Clave en localStorage
    }
  )
);