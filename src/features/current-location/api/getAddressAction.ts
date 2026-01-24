'use server';

import { kakaoApi } from '@/shared/api/base';

export async function getAddressAction(lat: number, lon: number) {
  if (!lat || !lon) {
    throw new Error('좌표 정보가 없습니다.');
  }

  try {
    const { data } = await kakaoApi.get(`/geo/coord2regioncode.json`, {
      params: {
        x: lon,
        y: lat,
      },
    });
    console.log('data', data);

    if (data.documents && data.documents.length > 0) {
      const address = data.documents[0];
      return `${address.region_1depth_name} ${address.region_2depth_name}`;
    }
    return null;
  } catch (error) {
    console.error('Kakao Server Action Error:', error);
    return null;
  }
}
