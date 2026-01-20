"use client"; // Next.js App Router에서 Hooks를 쓰려면 필수

import { useLocationSearch } from "@/features/search-location/model/useLocationSearch";
import { Input } from "@/shared/ui/Input";
import { cn } from "@/shared/lib/utils";

export const SearchSection = () => {
    const { searchTerm, setSearchTerm, searchResults, isFocused, setIsFocused } = useLocationSearch();

    return (
        <section className="w-full max-w-md mx-auto p-4 relative">
            <h2 className="text-xl font-bold mb-4 text-center">동네 예보 검색</h2>

            {/* 검색 입력창 */}
            <div className="relative">
                <Input
                    placeholder="지역명으로 검색하세요 (예: 종로구, 청운동)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        // 클릭 이벤트가 발생하기 전에 닫히는 것을 방지하기 위해 딜레이
                        setTimeout(() => setIsFocused(false), 200);
                    }}
                    className="w-full"
                />
            </div>

            {/* 검색 결과 리스트 */}
            {isFocused && searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((location, index) => (
                                <li
                                    key={`${location}-${index}`}
                                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition-colors"
                                    onClick={() => {
                                        console.log("선택된 지역:", location);
                                        alert(`선택: ${location}`); // 임시 확인용
                                    }}
                                >
                                    {/* 검색어 하이라이팅 처리 (옵션) */}
                                    {location.split(searchTerm).map((part, i) =>
                                        i === location.split(searchTerm).length - 1 ? (
                                            part
                                        ) : (
                                            <span key={i}>
                                                {part}
                                                <span className="text-blue-600 font-bold">{searchTerm}</span>
                                            </span>
                                        )
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};