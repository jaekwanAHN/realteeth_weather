export default function Loading() {
  // 실제 페이지의 배경색과 동일하게 맞춤 (bg-blue-50)
  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-50 p-8">
      <div className="w-full max-w-2xl animate-pulse space-y-8">
        {/* --- 1. 헤더 영역 (뒤로가기, 즐겨찾기 버튼 자리) --- */}
        <div className="flex h-8 items-center justify-between px-4">
          {/* 뒤로가기 아이콘 자리 */}
          <div className="h-6 w-6 rounded bg-blue-200/50"></div>
          {/* 즐겨찾기 버튼 자리 */}
          <div className="h-8 w-8 rounded-full bg-blue-200/50"></div>
        </div>

        {/* --- 2. 날씨 카드 영역 (CurrentWeatherCard 구조 복사) --- */}
        {/* 중요: 실제 카드와 동일한 패딩(p-8), 테두리, 그림자 클래스 사용 */}
        <div className="w-full rounded-3xl border border-white/50 bg-white p-8 text-center shadow-lg">
          {/* 내부 간격(space-y-6)도 동일하게 유지 */}
          <div className="flex flex-col items-center space-y-6">
            {/* 지역명 자리 (선택적이지만 공간 확보) */}
            <div className="mb-2 h-6 w-1/3 rounded bg-gray-200"></div>

            {/* 메인 아이콘 자리 (w-32 h-32 동일하게) */}
            <div className="h-32 w-32 rounded-full bg-gray-200"></div>

            {/* 온도 자리 (text-6xl 크기에 맞춰 대략적인 높이 설정) */}
            <div className="h-16 w-1/2 rounded bg-gray-200"></div>

            {/* 날씨 설명 자리 */}
            <div className="h-6 w-1/4 rounded bg-gray-200"></div>

            {/* 하단 그리드 정보 (실제 그리드 구조와 동일하게) */}
            <div className="mt-6 grid w-full grid-cols-3 gap-4 rounded-2xl bg-gray-50 p-6">
              {/* 3개의 동일한 박스 반복 */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-4 w-8 rounded bg-gray-200"></div>{' '}
                  {/* 라벨(최고/최저 등) */}
                  <div className="h-6 w-12 rounded bg-gray-300"></div>{' '}
                  {/* 값 */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- 3. 예보 위젯 영역 (HourlyForecast 구조 복사) --- */}
        <div className="mt-8 w-full space-y-4">
          {/* 제목 자리 */}
          <div className="h-6 w-40 rounded bg-blue-200/50 px-1"></div>

          {/* 가로 스크롤 컨테이너 구조 동일하게 */}
          <div className="flex gap-4 overflow-x-hidden pb-4">
            {/* 예보 카드 5개 정도 흉내 */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex min-w-[80px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="h-4 w-10 rounded bg-gray-200"></div>{' '}
                {/* 시간 */}
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>{' '}
                {/* 아이콘 */}
                <div className="h-6 w-8 rounded bg-gray-300"></div> {/* 온도 */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
