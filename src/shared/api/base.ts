import axios from 'axios';

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: process.env.OPENWEATHER_API_KEY,
    lang: 'kr',
    units: 'metric',
  },
});
