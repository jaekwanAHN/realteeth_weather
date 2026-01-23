import { useQuery } from '@tanstack/react-query';
import {
  getCurrentWeatherAction,
  getSimpleWeatherAction,
} from '@/entities/weather/api/weatherAction';

import { CurrentWeatherData, SimpleWeatherData } from './types';

export const useSimpleWeatherQuery = (lat: number, lon: number) => {
  return useQuery<SimpleWeatherData>({
    queryKey: ['weather', 'simple', lat, lon],
    queryFn: async () => {
      const result = await getSimpleWeatherAction(lat, lon);

      if (!result.success || !result.data) {
        throw new Error(
          result.error || '날씨 데이터를 불러오는데 실패했습니다.'
        );
      }

      return result.data;
    },
    enabled: !!lat && !!lon,
  });
};

export const useCurrentWeatherQuery = (
  lat: number | null,
  lon: number | null
) => {
  return useQuery<CurrentWeatherData | null>({
    queryKey: ['weather', 'full', lat, lon],
    queryFn: async () => {
      if (!lat || !lon) return null;

      const result = await getCurrentWeatherAction(lat, lon);

      if (!result.success || !result.data) {
        throw new Error(result.error || '날씨 정보를 가져올 수 없습니다.');
      }

      return result.data; // { weather, forecast } 반환
    },
    enabled: !!lat && !!lon,
  });
};
