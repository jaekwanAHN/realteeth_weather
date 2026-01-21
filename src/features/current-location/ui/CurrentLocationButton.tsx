'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocationNameAction } from '../api/action';

export const CurrentLocationButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      return;
    }

    setIsLoading(true);

    // 1. 브라우저 GPS API 호출
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 2. 좌표 -> 주소 변환 (Server Action 호출)
          const locationName = await getLocationNameAction(latitude, longitude);

          if (locationName) {
            // 3. 상세 페이지로 이동
            const encodedName = encodeURIComponent(locationName);
            router.push(`/detail/${encodedName}`);
          } else {
            alert('위치 정보를 주소로 변환하지 못했습니다.');
          }
        } catch (error) {
          console.error(error);
          alert('위치 정보를 가져오는 중 에러가 발생했습니다.');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation Error:', error);
        setIsLoading(false);
        // 권한 거부 등의 에러 처리
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('위치 정보 제공을 허용해주세요.');
            break;
          default:
            alert('위치 정보를 가져오는데 실패했습니다.');
        }
      }
    );
  };

  return (
    <button
      onClick={handleCurrentLocation}
      disabled={isLoading}
      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        isLoading
          ? 'cursor-not-allowed bg-gray-100 text-gray-400'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
      } `}
    >
      {isLoading ? (
        <span>위치 확인 중...</span>
      ) : (
        <>
          {/* 아이콘 (Heroicons 등) */}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>내 위치로 날씨 보기</span>
        </>
      )}
    </button>
  );
};
