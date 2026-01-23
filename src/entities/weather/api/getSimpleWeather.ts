import { weatherApi } from '@/shared/api/base';

interface SimpleWeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  icon: string;
  description: string;
}

export const getSimpleWeather = async (
  lat: number,
  lon: number
): Promise<SimpleWeatherData | null> => {
  try {
    const response = await weatherApi.get('/data/2.5/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        lang: 'kr',
      },
    });

    const { main, weather } = response.data;

    return {
      temp: Math.round(main.temp),
      temp_min: Math.round(main.temp_min),
      temp_max: Math.round(main.temp_max),
      icon: weather[0].icon,
      description: weather[0].description,
    };
  } catch (error) {
    console.error('Simple Weather Fetch Error:', error);
    return null;
  }
};
