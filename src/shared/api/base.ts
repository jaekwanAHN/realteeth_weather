import axios from 'axios';
import { API_URLS } from '@/shared/config/constants';

export const weatherApi = axios.create({
  baseURL: API_URLS.OPEN_WEATHER_API,
  params: {
    appid: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
    lang: 'kr',
    units: 'metric',
  },
});

export const kakaoApi = axios.create({
  baseURL: API_URLS.KAKAO,
  headers: {
    Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
  },
});
