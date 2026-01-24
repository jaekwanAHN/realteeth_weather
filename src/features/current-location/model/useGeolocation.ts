import { useState, useEffect } from 'react';

interface Coords {
  lat: number;
  lon: number;
}

export const useGeolocation = () => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('위치 정보를 사용할 수 없는 브라우저입니다.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError('위치 권한을 허용해주세요. 😢');
        setIsLoading(false);
      }
    );
  }, []);

  return { coords, error, isLoading };
};
