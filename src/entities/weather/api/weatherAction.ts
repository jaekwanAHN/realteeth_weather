'use server';

import { weatherApi } from '@/shared/api/base';

interface WeatherResponse {
  success: boolean;
  data?: {
    temp: number;
    temp_min: number;
    temp_max: number;
    icon: string;
    description: string;
  };
  error?: string;
}

export const getSimpleWeatherAction = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      console.error('Server Error: API Key is missing');
      return { success: false, error: 'Server Configuration Error' };
    }

    const response = await weatherApi.get(`/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        lang: 'kr',
      },
    });

    const { main, weather } = response.data;

    return {
      success: true,
      data: {
        temp: Math.round(main.temp),
        temp_min: Math.round(main.temp_min),
        temp_max: Math.round(main.temp_max),
        icon: weather[0].icon,
        description: weather[0].description,
      },
    };
  } catch (error) {
    console.error('Weather Fetch Error:', error);
    return { success: false, error: 'Failed to fetch weather data' };
  }
};

export const getCurrentWeatherAction = async (lat: number, lon: number) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      throw new Error('API Key is missing on server');
    }

    const weatherPromise = weatherApi.get(`/data/2.5/weather`, {
      params: { lat, lon, appid: apiKey, units: 'metric', lang: 'kr' },
    });

    const forecastPromise = weatherApi.get(`/data/2.5/forecast`, {
      params: { lat, lon, appid: apiKey, units: 'metric', lang: 'kr' },
    });

    const [weatherRes, forecastRes] = await Promise.all([
      weatherPromise,
      forecastPromise,
    ]);

    return {
      success: true,
      data: {
        weather: weatherRes.data,
        forecast: forecastRes.data,
      },
    };
  } catch (error) {
    console.error('Main Weather Action Error:', error);
    return { success: false, error: '날씨 정보를 가져오는데 실패했습니다.' };
  }
};
