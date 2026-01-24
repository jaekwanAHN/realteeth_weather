'use client';

import { useLocationSearch } from '@/features/search-location/model/useLocationSearch';
import { Input } from '@/shared/ui/Input';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useDropdownNavigation } from '../model/useDropdownNavigation';

export const SearchSection = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchTerm, setSearchTerm, searchResults, isFocused, setIsFocused } =
    useLocationSearch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchTerm, searchResults.length]);

  const handleSelectLocation = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    router.push(`/detail/${encodedLocation}`);
  };
  const { activeIndex, setActiveIndex, listRef, onKeyDown } =
    useDropdownNavigation<string>({
      items: searchResults,
      isFocused,
      setIsFocused,
      searchTerm,
      onSelect: handleSelectLocation,
    });

  return (
    <section className="relative mx-auto w-full max-w-md p-4">
      <h2 className="mb-4 text-center text-xl font-bold text-black">
        동네 예보 검색
      </h2>

      <div className="relative">
        <Input
          ref={inputRef}
          placeholder="지역명으로 검색하세요 (예: 종로구, 청운동)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
          }}
          className="w-full text-black"
        />
        {isFocused && searchTerm && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
            {searchResults.length > 0 ? (
              <ul ref={listRef}>
                {searchResults.map((location, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <li
                      key={`${location}-${index}`}
                      className={[
                        'cursor-pointer px-4 py-2 text-sm text-gray-700 transition-colors',
                        isActive ? 'bg-blue-50' : 'hover:bg-blue-50',
                      ].join(' ')}
                      onMouseEnter={() => setActiveIndex(index)}
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
                  );
                })}
              </ul>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
