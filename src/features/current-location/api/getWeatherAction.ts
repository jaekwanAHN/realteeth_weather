'use server';

import { getCurrentWeather } from '@/entities/weather/api/weather';
import { getReverseGeoLocation } from '@/entities/location/api/geocode';

export const getMyLocationWeather = async (lat: number, lon: number) => {
  // 1. 좌표로 지역 이름 찾기 (Reverse Geocoding)
  const locationName = await getReverseGeoLocation(lat, lon);

  // 2. 좌표로 날씨 찾기
  const weatherData = await getCurrentWeather({ lat, lon });

  return {
    locationName,
    weatherData,
  };
};
