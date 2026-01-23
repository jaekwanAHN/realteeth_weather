import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. 즐겨찾기 아이템 타입 정의
export interface FavoriteLocation {
  name: string;
  lat: number;
  lon: number;
}

interface FavoriteStore {
  favorites: FavoriteLocation[];
  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (lat: number, lon: number) => void;
  isFavorite: (name: string) => boolean;
  updateFavoriteName: (lat: number, lon: number, newName: string) => void;
}

// 2. 스토어 생성 (persist 미들웨어로 로컬스토리지 자동 저장)
export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (location) =>
        set((state) => {
          // 중복 방지
          if (state.favorites.some((fav) => fav.name === location.name)) {
            return state;
          }
          return { favorites: [...state.favorites, location] };
        }),

      removeFavorite: (lat, lon) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => fav.lat !== lat || fav.lon !== lon
          ),
        })),

      // 특정 지역이 즐겨찾기에 있는지 확인
      isFavorite: (name) => {
        return get().favorites.some((fav) => fav.name === name);
      },

      updateFavoriteName: (lat, lon, newName) =>
        set((state) => ({
          favorites: state.favorites.map((fav) =>
            fav.lat === lat && fav.lon === lon
              ? { ...fav, name: newName } // 이름 변경
              : fav
          ),
        })),
    }),
    {
      name: 'weather-favorites', // 로컬스토리지에 저장될 키 이름
    }
  )
);
