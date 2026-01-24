'use client';

import { useCurrentWeatherQuery } from '@/entities/weather/model/useWeatherQuery';
import { CurrentWeatherCard } from '@/widgets/CurrentWeather/ui/CurrentWeatherCard';
import { CurrentWeatherSkeleton } from '@/widgets/CurrentWeather/ui/CurrentWeatherSkeleton';
import { useEffect, useState } from 'react';

export const MyLocationWeather = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [geoError, setGeoError] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('위치 정보를 사용할 수 없는 브라우저입니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        setGeoError('위치 권한을 허용해주세요. 😢');
      }
    );
  }, []);

  const { data, isLoading, isError } = useCurrentWeatherQuery(
    coords?.lat ?? null,
    coords?.lon ?? null
  );

  let content;

  const emptyCardClass =
    'mx-auto w-full max-w-md min-h-[460px] flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/50 bg-white p-8 text-center shadow-lg';

  if (geoError) {
    content = (
      <div className={emptyCardClass}>
        <span className="text-red-500">{geoError}</span>
      </div>
    );
  } else if (!coords) {
    content = (
      <div className={emptyCardClass}>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
        <p className="text-gray-500">현재 위치를 찾는 중...</p>
      </div>
    );
  } else if (isLoading) {
    content = <CurrentWeatherSkeleton />;
  } else if (isError || !data) {
    content = (
      <div className={emptyCardClass}>
        <span className="text-gray-500">
          날씨 정보를 불러오는데 실패했습니다.
        </span>
      </div>
    );
  } else {
    content = (
      <CurrentWeatherCard data={data.weather} locationName="현재 위치" />
    );
  }

  return (
    <div className="animate-fade-in mt-8">
      <h3 className="mb-2 text-center text-sm font-medium text-gray-500">
        현재 내 위치
      </h3>
      {content}
    </div>
  );
};
