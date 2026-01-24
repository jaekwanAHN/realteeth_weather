// import { useQuery } from '@tanstack/react-query';
// import { getLocationNameAction } from '@/entities/location/api/geocode';

// export const useKakaoAddress = (lat: number | null, lon: number | null) => {
//   return useQuery({
//     queryKey: ['kakaoAddress', lat, lon],
//     queryFn: async () => {
//       if (!lat || !lon) return null;

//       try {
//         const locationName = await getLocationNameAction(lat, lon);
//         console.log('locationName', locationName);
//         if (locationName) {
//           const encodedName = encodeURIComponent(locationName);
//           console.log('encodedName', encodedName);
//           return encodedName;
//         }

//         return null;
//       } catch (error) {
//         console.error('Kakao Geocoding Error:', error);
//         return null;
//       }
//     },
//     enabled: !!lat && !!lon,
//     staleTime: 1000 * 60 * 60,
//   });
// };
