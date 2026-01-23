'use client';

import { useEffect, useState } from 'react';
import {
  useFavoriteStore,
  FavoriteLocation,
} from '@/entities/favorite/model/store';

interface FavoriteButtonProps {
  location: FavoriteLocation;
}

export const FavoriteButton = ({ location }: FavoriteButtonProps) => {
  // Store에서 필요한 함수들 가져오기
  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  // Hydration 이슈 방지용 (Next.js에서 로컬스토리지 사용 시 필수)
  const [mounted, setMounted] = useState(false);

  // Zustand Store의 상태를 실시간으로 반영하기 위해 변수로 선언
  // (Store가 업데이트되면 컴포넌트가 리렌더링되면서 값을 다시 읽어옵니다)
  const isFav = isFavorite(location.lat, location.lon);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버 사이드 렌더링 중에는 아무것도 보여주지 않음 (아이콘 깨짐 방지)
  if (!mounted) return <div className="h-8 w-8" />;

  const handleToggle = () => {
    if (isFav) {
      // 이미 즐겨찾기면 삭제
      removeFavorite(location.lat, location.lon);
    } else {
      // 즐겨찾기 추가 시도 (Store에서 true/false 반환)
      const success = addFavorite(location);

      // 6개 초과로 실패했을 경우 알림
      if (!success) {
        alert('즐겨찾기는 최대 6개까지만 저장할 수 있습니다. 😢');
      }
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="group rounded-full p-2 transition-colors hover:bg-black/5"
      aria-label={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      {isFav ? (
        // 꽉 찬 하트 (활성) - 빨간색 (기존 디자인)
        <svg
          className="animate-scale-in h-8 w-8 fill-current text-red-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        // 빈 하트 (비활성) - 회색 (기존 디자인)
        <svg
          className="h-8 w-8 fill-none stroke-current stroke-2 text-gray-400 group-hover:text-red-400"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </button>
  );
};
