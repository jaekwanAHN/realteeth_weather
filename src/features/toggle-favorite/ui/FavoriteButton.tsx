'use client';

import { useEffect, useState } from 'react';
import {
  useFavoriteStore,
  FavoriteLocation,
} from '@/entities/favorite/model/store';

interface FavoriteButtonProps {
  location: FavoriteLocation;
}

export const FavoriteButton = ({ location }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  const [mounted, setMounted] = useState(false);

  const isFav = isFavorite(location.lat, location.lon);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-8 w-8" />;

  const handleToggle = () => {
    if (isFav) {
      removeFavorite(location.lat, location.lon);
    } else {
      const success = addFavorite(location);

      if (!success) {
        alert('즐겨찾기는 최대 6개까지만 저장할 수 있습니다. 😢');
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="group rounded-full p-2 transition-colors hover:bg-black/5"
      aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      {isFav ? (
        <svg
          className="animate-scale-in h-8 w-8 fill-current text-red-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          className="h-8 w-8 fill-none stroke-current stroke-2 text-gray-400 group-hover:text-red-400"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
};
