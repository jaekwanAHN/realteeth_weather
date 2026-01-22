import axios from 'axios';

// Todo. baseURl 환경변수처리
export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: process.env.OPENWEATHER_API_KEY,
    lang: 'kr',
    units: 'metric',
  },
});

export const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
  },
});
