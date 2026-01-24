import { useQuery } from '@tanstack/react-query';
import { getAddressAction } from '@/features/current-location/api/getAddressAction';

export const useKakaoAddress = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ['kakaoAddress', lat, lon],
    queryFn: async () => {
      if (!lat || !lon) return null;

      const address = await getAddressAction(lat, lon);
      return address;
    },
    enabled: !!lat && !!lon,
    staleTime: 1000 * 60 * 60,
  });
};
