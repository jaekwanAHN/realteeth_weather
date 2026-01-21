import { weatherApi } from '@/shared/api/base';

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  local_names?: Record<string, string>;
}

export const getGeoLocation = async (
  query: string
): Promise<GeoLocation | null> => {
  try {
    // Geocoding API 호출
    // limit=1: 가장 정확한 1개만 가져옴
    const response = await weatherApi.get<GeoLocation[]>('/geo/1.0/direct', {
      params: {
        q: `${query},KR`, // 국가 코드 KR 추가하여 정확도 향상
        limit: 1,
      },
    });

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  } catch (error) {
    console.error('Geocoding Error:', error);
    throw new Error('위치 정보를 찾을 수 없습니다.');
  }
};
