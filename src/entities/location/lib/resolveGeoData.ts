import { getGeoLocationAction } from '@/entities/location/api/locationAction';

interface GeoData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export async function resolveGeoData(
  locationName: string,
  lat?: string,
  lon?: string
): Promise<GeoData | null> {
  if (lat && lon) {
    return {
      name: locationName,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country: 'KR',
    };
  }

  const searchKeyword = locationName.replaceAll('-', ' ');
  const { success, data } = await getGeoLocationAction(searchKeyword);

  if (success && data) {
    return data;
  }

  return null;
}
