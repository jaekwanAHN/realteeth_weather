'use client';

import { useRouter } from 'next/navigation';
import { useLocationSearch } from '@/features/search-location/model/useLocationSearch';
import { Input } from '@/shared/ui/Input';

export const SearchSection = () => {
  const router = useRouter();
  const { searchTerm, setSearchTerm, searchResults, isFocused, setIsFocused } =
    useLocationSearch();

  const handleSelectLocation = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    router.push(`/detail/${encodedLocation}`);
  };

  return (
    <section className="relative mx-auto w-full max-w-md p-4">
      <h2 className="mb-4 text-center text-xl font-bold">동네 예보 검색</h2>

      <div className="relative">
        <Input
          placeholder="지역명으로 검색하세요 (예: 종로구, 청운동)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
          }}
          className="w-full"
        />
      </div>

      {isFocused && searchTerm && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((location, index) => (
                <li
                  key={`${location}-${index}`}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50"
                  onMouseDown={() => handleSelectLocation(location)}
                >
                  {location.split(searchTerm).map((part, i) =>
                    i === location.split(searchTerm).length - 1 ? (
                      part
                    ) : (
                      <span key={i}>
                        {part}
                        <span className="font-bold text-blue-600">
                          {searchTerm}
                        </span>
                      </span>
                    )
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </section>
  );
};
