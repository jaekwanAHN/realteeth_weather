'use server'; // 👈 이 함수는 무조건 서버에서만 실행됩니다!

import axios from 'axios';

// 클라이언트로 보낼 데이터 타입 정의
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
    // 서버 환경이므로 NEXT_PUBLIC 없이 바로 접근 가능
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      console.error('Server Error: API Key is missing');
      return { success: false, error: 'Server Configuration Error' };
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: apiKey,
          units: 'metric',
          lang: 'kr',
        },
      }
    );

    const { main, weather } = response.data;

    // 필요한 데이터만 쏙 뽑아서 반환 (보안성 UP)
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
    const apiKey = process.env.OPENWEATHER_API_KEY; // 서버 키 사용

    if (!apiKey) {
      throw new Error('API Key is missing on server');
    }

    // 1. 현재 날씨 요청
    const weatherPromise = axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: { lat, lon, appid: apiKey, units: 'metric', lang: 'kr' },
      }
    );

    // 2. 예보 요청 (5일/3시간)
    const forecastPromise = axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: { lat, lon, appid: apiKey, units: 'metric', lang: 'kr' },
      }
    );

    // 두 요청을 병렬로 동시에 실행 (속도 향상)
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
