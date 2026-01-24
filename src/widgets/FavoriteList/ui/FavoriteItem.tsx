'use client';

import {
  FavoriteLocation,
  useFavoriteStore,
} from '@/entities/favorite/model/store';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSimpleWeatherQuery } from '@/entities/weather/model/useWeatherQuery';
import { API_URLS } from '@/shared/config/constants';

interface Props {
  item: FavoriteLocation;
}

export const FavoriteItem = ({ item }: Props) => {
  const { removeFavorite, updateFavoriteName } = useFavoriteStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const {
    data: weather,
    isLoading,
    isError,
  } = useSimpleWeatherQuery(item.lat, item.lon);

  const handleSave = () => {
    if (!editName.trim()) return;
    updateFavoriteName(item.lat, item.lon, editName);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm(`'${item.name}'을(를) 삭제하시겠습니까?`)) {
      removeFavorite(item.lat, item.lon);
    }
  };

  return (
    <li className="group relative mb-2 rounded-xl border border-gray-100 bg-white p-3 transition-all hover:shadow-md">
      {isEditing ? (
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-1 rounded border px-2 py-1 text-sm outline-none focus:border-blue-500"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button
            onClick={handleSave}
            className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200"
          >
            저장
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 hover:bg-gray-200"
          >
            취소
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Link
            href={`/detail/${encodeURIComponent(item.name)}?lat=${item.lat}&lon=${item.lon}`}
            className="min-w-0 flex-1"
          >
            <div className="truncate pr-2 font-semibold text-gray-800">
              {item.name}
            </div>

            <div className="mt-1 flex h-6 items-center gap-2 text-sm text-gray-600">
              {isLoading ? (
                <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
              ) : isError || !weather ? (
                <span className="text-xs text-red-400">날씨 정보 없음</span>
              ) : (
                <>
                  <div className="relative h-6 w-6">
                    <Image
                      src={`${API_URLS.OPEN_WEATHER_IMG}/img/wn/${weather.icon}.png`}
                      alt={weather.description}
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold text-black">{weather.temp}°</span>
                  <span className="text-xs text-gray-400">
                    ({weather.temp_min}° / {weather.temp_max}°)
                  </span>
                </>
              )}
            </div>
          </Link>
          <div className="absolute top-2 right-2 flex gap-1 rounded bg-white/80 p-0.5 opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              className="rounded p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-500"
              title="이름 변경"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
              title="삭제"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </li>
  );
};
