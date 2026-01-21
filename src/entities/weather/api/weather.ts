import { weatherApi } from '@/shared/api/base';
import type { WeatherData, ForecastData } from '../model/types';

interface GetWeatherParams {
  lat: number;
  lon: number;
}

export const getCurrentWeather = async ({
  lat,
  lon,
}: GetWeatherParams): Promise<WeatherData | null> => {
  try {
    const response = await weatherApi.get<WeatherData>('/data/2.5/weather', {
      params: {
        lat,
        lon,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};

export const getHourlyForecast = async ({
  lat,
  lon,
}: GetWeatherParams): Promise<ForecastData | null> => {
  try {
    const response = await weatherApi.get<ForecastData>('/data/2.5/forecast', {
      params: {
        lat,
        lon,
        cnt: 8, // 24시간치만 필요하므로 8개(3시간 x 8 = 24h)만 가져옴
      },
    });
    return response.data;
  } catch (error) {
    console.error('Forecast API Error:', error);
    return null;
  }
};
