'use client';

import { useEffect, useState } from 'react';
import { WeatherData } from '@/entities/weather/model/types';
import { CurrentWeatherCard } from '@/widgets/CurrentWeather/ui/CurrentWeatherCard';
import { getMyLocationWeather } from '../api/getWeatherAction';
import { getCurrentWeatherAction } from '@/entities/weather/api/weatherAction';

export const MyLocationWeather = () => {
  const [weather, setWeather] = useState<{
    data: WeatherData;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. 브라우저 위치 지원 여부 확인
    if (!navigator.geolocation) {
      setError('위치 정보를 지원하지 않는 브라우저입니다.');
      setLoading(false);
      return;
    }

    // 2. 위치 가져오기
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // 3. 서버 액션 호출 (날씨 + 지역명 가져오기)
          // const result = await getMyLocationWeather(latitude, longitude);
          const result = await getCurrentWeatherAction(latitude, longitude);

          if (result.success && result.data) {
            setWeather({
              data: result.data.weather,
              name: result.data.weather.name,
            });
          } else {
            setError('날씨 정보를 불러오지 못했습니다.');
          }
        } catch (err) {
          console.error(err);
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Geolocation Error:', err);
        setError('위치 정보 권한이 필요합니다.');
        setLoading(false);
      }
    );
  }, []); // 컴포넌트 마운트 시 1회 실행

  // --- UI 렌더링 ---

  if (loading) {
    return (
      <div className="mx-auto mt-8 w-full max-w-md animate-pulse rounded-3xl bg-white/50 p-8 text-center">
        <div className="mx-auto mb-4 h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gray-200"></div>
        <p className="text-sm text-gray-500">
          현재 위치의 날씨를 불러오는 중...
        </p>
      </div>
    );
  }

  if (error) {
    // 에러 발생 시 조용히 아무것도 안 보여주거나, 메시지 표시
    // (메인 화면을 해치지 않기 위해 null 리턴도 가능)
    return (
      <div className="mx-auto mt-8 w-full max-w-md rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-500">
        📍 {error} <br /> (검색 기능을 이용해주세요)
      </div>
    );
  }

  return (
    <div className="animate-fade-in mt-8">
      <h3 className="mb-2 text-center text-sm font-medium text-gray-500">
        현재 내 위치
      </h3>
      {weather && (
        <CurrentWeatherCard data={weather.data} locationName={weather.name} />
      )}
    </div>
  );
};
