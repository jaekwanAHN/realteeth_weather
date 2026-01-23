import { FavoriteButton } from '@/features/toggle-favorite/ui/FavoriteButton';

interface DetailHeaderProps {
  locationName: string;
  lat: number;
  lon: number;
}

export const DetailHeader = ({ locationName, lat, lon }: DetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4">
      {/* 뒤로가기 버튼 */}
      <a
        href="/"
        className="text-gray-500 transition-colors hover:text-gray-800"
        aria-label="뒤로 가기"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </a>

      {/* 즐겨찾기 버튼 */}
      <FavoriteButton
        location={{
          name: locationName,
          lat: lat,
          lon: lon,
        }}
      />
    </div>
  );
};
