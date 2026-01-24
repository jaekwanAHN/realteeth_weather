import { kakaoApi } from '@/shared/api/base';
import { GeoLocation } from '../model/types';

interface KakaoAddressDocument {
  address_name: string;
  y: string;
  x: string;
  address: {
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
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
    const response = await kakaoApi.get<KakaoSearchResponse>(
      '/search/address.json',
      {
        params: {
          query: query,
          analyze_type: 'similar',
        },
      }
    );

    const { documents } = response.data;

    if (documents.length === 0) {
      return null;
    }

    const bestMatch = documents[0];

    return {
      name: bestMatch.address_name,
      lat: parseFloat(bestMatch.y),
      lon: parseFloat(bestMatch.x),
      country: 'KR',
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
