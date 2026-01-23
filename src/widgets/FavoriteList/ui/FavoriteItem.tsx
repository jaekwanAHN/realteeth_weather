'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // 이미지 최적화 사용
import {
  useFavoriteStore,
  FavoriteLocation,
} from '@/entities/favorite/model/store';
import { getSimpleWeather } from '@/entities/weather/api/getSimpleWeather'; // 방금 만든 API

interface Props {
  item: FavoriteLocation;
}

// 날씨 상태 타입 정의
interface WeatherState {
  temp: number;
  min: number;
  max: number;
  icon: string;
}

export const FavoriteItem = ({ item }: Props) => {
  const { removeFavorite, updateFavoriteName } = useFavoriteStore();

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [weather, setWeather] = useState<WeatherState | null>(null); // 날씨 데이터

  // 컴포넌트가 마운트되면 날씨 데이터를 가져옴
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getSimpleWeather(item.lat, item.lon);
      if (data) {
        setWeather({
          temp: data.temp,
          min: data.temp_min,
          max: data.temp_max,
          icon: data.icon,
        });
      }
    };
    fetchWeather();
  }, [item.lat, item.lon]); // 좌표가 바뀌면 다시 호출

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
        /* ✏️ 수정 모드 UI (기존 동일) */
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
        /* 👀 보기 모드 (날씨 정보 추가됨) */
        <div className="flex items-center justify-between">
          {/* 왼쪽: 지역 이름 클릭 영역 */}
          <Link
            href={`/detail/${encodeURIComponent(item.name)}?lat=${item.lat}&lon=${item.lon}`}
            className="min-w-0 flex-1" // min-w-0은 말줄임표(...)를 위해 필수
          >
            <div className="truncate pr-2 font-semibold text-gray-800">
              {item.name}
            </div>

            {/* 날씨 정보 표시 영역 */}
            <div className="mt-1 flex h-6 items-center gap-2 text-sm text-gray-600">
              {weather ? (
                <>
                  {/* 날씨 아이콘 */}
                  <div className="relative h-6 w-6">
                    <Image
                      src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                      alt="weather icon"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                  {/* 현재 기온 */}
                  <span className="font-bold text-black">{weather.temp}°</span>
                  {/* 최저/최고 기온 */}
                  <span className="text-xs text-gray-400">
                    ({weather.min}° / {weather.max}°)
                  </span>
                </>
              ) : (
                // 로딩 중일 때 스켈레톤 UI
                <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
              )}
            </div>
          </Link>

          {/* 오른쪽: 수정/삭제 버튼 (마우스 오버 시 표시) */}
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
