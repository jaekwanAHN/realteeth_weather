import {
  getCurrentWeather,
  getHourlyForecast,
} from '@/entities/weather/api/weather';
import type { WeatherData, ForecastData } from '@/entities/weather/model/types';

// 반환 타입 정의
interface DetailPageData {
  weather: WeatherData | null;
  forecast: ForecastData | null;
}

// Hook이 아니라 일반 async 함수입니다.
export const getDetailData = async (
  lat: number,
  lon: number
): Promise<DetailPageData> => {
  try {
    // 여기서 Promise.all을 사용하여 병렬 처리
    const [weather, forecast] = await Promise.all([
      getCurrentWeather({ lat, lon }),
      getHourlyForecast({ lat, lon }),
    ]);

    return {
      weather,
      forecast,
    };
  } catch (error) {
    console.error('Failed to fetch detail page data', error);
    return { weather: null, forecast: null };
  }
};
