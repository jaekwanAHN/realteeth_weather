'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFavoriteStore } from '@/entities/favorite/model/store';
import { getCurrentWeather } from '@/entities/weather/api/weather'; // API 재사용
import { WeatherData } from '@/entities/weather/model/types';
import { getMyLocationWeather } from '@/features/current-location/api/getWeatherAction'; // 액션 재사용

export const FavoriteList = () => {
  const router = useRouter();
  const { favorites, removeFavorite } = useFavoriteStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Hydration 매칭

  if (favorites.length === 0) {
    return (
      <div className="mt-4 rounded-xl bg-white/50 py-8 text-center text-sm text-gray-400">
        즐겨찾기한 지역이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-8 w-full">
      <h3 className="mb-4 px-1 text-lg font-bold text-gray-800">
        ⭐ 즐겨찾는 지역
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {favorites.map((fav) => (
          <FavoriteItem key={fav.name} location={fav} />
        ))}
      </div>
    </div>
  );
};

// 개별 아이템 컴포넌트 (내부에서 날씨를 직접 가져옴)
const FavoriteItem = ({
  location,
}: {
  location: { name: string; lat: number; lon: number };
}) => {
  const router = useRouter();
  const { removeFavorite } = useFavoriteStore();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // 컴포넌트가 마운트되면 날씨 정보 가져오기
  useEffect(() => {
    // Client Component에서 바로 Server Action 등을 호출하여 데이터 로드
    const fetchWeather = async () => {
      // *주의: 실제 프로덕션에서는 과도한 API 호출을 막기 위해 캐싱(React Query)이 필요합니다.
      // 여기서는 학습용이므로 직접 호출 방식을 사용합니다.
      const result = await getMyLocationWeather(location.lat, location.lon);
      setWeather(result.weatherData);
    };
    fetchWeather();
  }, [location.lat, location.lon]);

  const handleCardClick = () => {
    router.push(`/detail/${encodeURIComponent(location.name)}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 버블링 방지
    if (confirm(`${location.name}을(를) 삭제하시겠습니까?`)) {
      removeFavorite(location.name);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* 왼쪽: 지역명 & 날씨 정보 */}
      <div className="flex items-center gap-4">
        {weather ? (
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].main}
            className="h-10 w-10 rounded-full bg-blue-50"
          />
        ) : (
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-100" />
        )}

        <div>
          <h4 className="font-bold text-gray-800">{location.name}</h4>
          {weather ? (
            <p className="text-sm text-gray-500">
              {Math.round(weather.main.temp)}° /{' '}
              {weather.weather[0].description}
            </p>
          ) : (
            <p className="text-xs text-gray-400">로딩 중...</p>
          )}
        </div>
      </div>

      {/* 오른쪽: 삭제 버튼 */}
      <button
        onClick={handleDelete}
        className="p-2 text-gray-300 transition-colors hover:text-red-500"
        aria-label="삭제"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
