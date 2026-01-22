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
  removeFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
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

      removeFavorite: (name) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.name !== name),
        })),

      // 특정 지역이 즐겨찾기에 있는지 확인
      isFavorite: (name) => {
        return get().favorites.some((fav) => fav.name === name);
      },
    }),
    {
      name: 'weather-favorites', // 로컬스토리지에 저장될 키 이름
    }
  )
);
