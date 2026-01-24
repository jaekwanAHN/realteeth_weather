export const CurrentWeatherSkeleton = () => {
  return (
    <div className="mx-auto min-h-[460px] w-full max-w-md rounded-3xl border border-white/50 bg-white p-8 text-center shadow-lg">
      <div className="space-y-6">
        {/* 날짜/지역명 스켈레톤 */}
        <div className="mx-auto h-7 w-40 animate-pulse rounded bg-gray-200" />

        {/* 아이콘 & 온도 스켈레톤 */}
        <div className="flex flex-col items-center justify-center">
          <div className="h-32 w-32 animate-pulse rounded-full bg-gray-200" />
          <div className="h-14 w-24 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-6 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        {/* 하단 그리드 정보 스켈레톤 */}
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-gray-50 p-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
              <div className="mt-1 h-6 w-12 animate-pulse rounded bg-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
