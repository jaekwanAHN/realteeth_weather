'use client';

import { useFavoriteStore } from '@/entities/favorite/model/store';
import { FavoriteItem } from './FavoriteItem';

export const FavoriteList = () => {
  const { favorites } = useFavoriteStore();

  if (favorites.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        즐겨찾는 지역이 없습니다.
      </div>
    );
  }

  return (
    <ul className="max-h-60 space-y-1 overflow-y-auto p-2">
      {favorites.map((fav) => (
        <FavoriteItem key={`${fav.lat}-${fav.lon}`} item={fav} />
      ))}
    </ul>
  );
};
