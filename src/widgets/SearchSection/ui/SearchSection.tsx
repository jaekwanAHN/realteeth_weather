'use client';

import { useRouter } from 'next/navigation'; // 1. 라우터 훅 import
import { useLocationSearch } from '@/features/search-location/model/useLocationSearch';
import { Input } from '@/shared/ui/Input';
import { cn } from '@/shared/lib/utils';

export const SearchSection = () => {
  const router = useRouter(); // 2. 라우터 초기화
  const { searchTerm, setSearchTerm, searchResults, isFocused, setIsFocused } =
    useLocationSearch();

  // 3. 지역 선택 시 상세 페이지로 이동하는 핸들러
  const handleSelectLocation = (location: string) => {
    // 한글 주소를 URL에 넣기 위해 인코딩 (예: 서울 -> %EC%84%9C%EC%9A%B8)
    const encodedLocation = encodeURIComponent(location);
    router.push(`/detail/${encodedLocation}`);
  };

  return (
    <section className="relative mx-auto w-full max-w-md p-4">
      <h2 className="mb-4 text-center text-xl font-bold">동네 예보 검색</h2>

      {/* 검색 입력창 */}
      <div className="relative">
        <Input
          placeholder="지역명으로 검색하세요 (예: 종로구, 청운동)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // 클릭 이벤트가 발생하기 전에 리스트가 사라지는 것을 방지 (0.2초 지연)
            setTimeout(() => setIsFocused(false), 200);
          }}
          className="w-full"
        />
      </div>

      {/* 검색 결과 리스트 */}
      {isFocused && searchTerm && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((location, index) => (
                <li
                  key={`${location}-${index}`}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50"
                  // 4. 클릭 이벤트 연결 (onMouseDown 사용 권장)
                  // onBlur보다 먼저 실행되게 하기 위해 onMouseDown을 사용합니다.
                  onMouseDown={() => handleSelectLocation(location)}
                >
                  {/* 검색어 하이라이팅 처리 */}
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
