import { kakaoApi } from '@/shared/api/base';
import { GeoLocation } from '../model/types';

// Kakao API 응답 타입 정의 (내부용)
interface KakaoAddressDocument {
  address_name: string;
  y: string; // 위도 (Latitude)
  x: string; // 경도 (Longitude)
  address: {
    region_1depth_name: string; // 도/시 (예: 강원도)
    region_2depth_name: string; // 시/군/구 (예: 원주시)
    region_3depth_name: string; // 읍/면/동 (예: 반곡동)
  };
}

interface KakaoSearchResponse {
  documents: KakaoAddressDocument[];
  meta: {
    total_count: number;
  };
}

export const getGeoLocation = async (
  query: string
): Promise<GeoLocation | null> => {
  try {
    // Kakao 주소 검색 API 호출
    // query 예시: "강원도 원주시 반곡동" (띄어쓰기 포함된 전체 주소 권장)
    const response = await kakaoApi.get<KakaoSearchResponse>(
      '/search/address.json',
      {
        params: {
          query: query,
          analyze_type: 'similar', // 'similar'를 쓰면 오타가 있어도 비슷하게 찾아줌
        },
      }
    );

    const { documents } = response.data;

    if (documents.length === 0) {
      return null;
    }

    // 가장 정확도 높은 첫 번째 결과 사용
    const bestMatch = documents[0];

    return {
      name: bestMatch.address_name, // "강원도 원주시 반곡동" 전체 주소 반환
      lat: parseFloat(bestMatch.y), // 문자열 -> 숫자로 변환
      lon: parseFloat(bestMatch.x),
      country: 'KR', // 카카오맵은 국내 전용이므로 KR 고정
    };
  } catch (error) {
    console.error('Kakao Geocoding Error:', error);
    return null;
  }
};

export const getReverseGeoLocation = async (
  lat: number,
  lon: number
): Promise<string | null> => {
  return null;
};
