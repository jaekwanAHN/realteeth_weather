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
  addFavorite: (location: FavoriteLocation) => boolean;
  removeFavorite: (lat: number, lon: number) => void;
  isFavorite: (lat: number, lon: number) => boolean;
  updateFavoriteName: (lat: number, lon: number, newName: string) => void;
}

// 2. 스토어 생성 (persist 미들웨어로 로컬스토리지 자동 저장)
export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (location) => {
        const { favorites } = get();

        if (favorites.length >= 6) {
          return false;
        }

        // 2. 아니면 추가하고 성공(true) 반환
        set((state) => ({ favorites: [...state.favorites, location] }));
        return true;
      },

      removeFavorite: (lat, lon) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (fav) => fav.lat !== lat || fav.lon !== lon
          ),
        })),

      // 특정 지역이 즐겨찾기에 있는지 확인
      isFavorite: (lat, lon) => {
        return get().favorites.some(
          (fav) => fav.lat === lat && fav.lon === lon
        );
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
