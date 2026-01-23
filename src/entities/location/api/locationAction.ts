'use server';

import { kakaoApi } from '@/shared/api/base';

interface LocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

interface LocationResponse {
  success: boolean;
  data?: LocationData | null;
  error?: string;
}

export const getGeoLocationAction = async (
  query: string
): Promise<LocationResponse> => {
  try {
    const apiKey = process.env.KAKAO_API_KEY;

    if (!apiKey) {
      console.error('Server Error: Kakao API Key is missing');
      return { success: false, error: 'Server Configuration Error' };
    }

    const response = await kakaoApi.get(`search/address.json`, {
      params: { query },
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    });

    const documents = response.data.documents;

    if (!documents || documents.length === 0) {
      return { success: true, data: null }; // 검색 결과 없음
    }

    // 첫 번째 검색 결과 사용
    const bestMatch = documents[0];

    return {
      success: true,
      data: {
        name: query, // 검색어 그대로 사용 (또는 bestMatch.address_name)
        lat: parseFloat(bestMatch.y), // Kakao는 y가 위도(lat)
        lon: parseFloat(bestMatch.x), // Kakao는 x가 경도(lon)
        country: 'KR',
      },
    };
  } catch (error) {
    console.error('Kakao Geocode Error:', error);
    return { success: false, error: 'Failed to fetch location data' };
  }
};
