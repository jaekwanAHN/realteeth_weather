import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteLocation {
  name: string;
  lat: number;
  lon: number;
}

interface FavoriteStore {
  favorites: FavoriteLocation[];
  addFavorite: (location: FavoriteLocation) => boolean;
  removeFavorite: (lat: number, lon: number) => void;
  isFavorite: (lat: number, lon: number) => boolean;
  updateFavoriteName: (lat: number, lon: number, newName: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (location) => {
        const { favorites } = get();

        const isDuplicate = favorites.some(
          (fav) => fav.lat === location.lat && fav.lon === location.lon
        );

        if (isDuplicate) {
          return false;
        }

        if (favorites.length >= 6) {
          return false;
        }

        set((state) => ({ favorites: [...state.favorites, location] }));
        return true;
      },

      removeFavorite: (lat, lon) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => fav.lat !== lat || fav.lon !== lon
          ),
        })),

      isFavorite: (lat, lon) => {
        return get().favorites.some(
          (fav) => fav.lat === lat && fav.lon === lon
        );
      },

      updateFavoriteName: (lat, lon, newName) =>
        set((state) => ({
          favorites: state.favorites.map((fav) =>
            fav.lat === lat && fav.lon === lon
              ? { ...fav, name: newName }
              : fav
          ),
        })),
    }),
    {
      name: 'weather-favorites',
    }
  )
);
