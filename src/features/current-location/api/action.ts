'use server';

import { getReverseGeoLocation } from '@/entities/location/api/geocode';

export const getLocationNameAction = async (lat: number, lon: number) => {
  const locationName = await getReverseGeoLocation(lat, lon);
  return locationName;
};
