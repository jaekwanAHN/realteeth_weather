import { ForecastData } from '@/entities/weather/model/types';

interface HourlyForecastProps {
  data: ForecastData;
}

export const HourlyForecast = ({ data }: HourlyForecastProps) => {
  // 시간 포맷팅 함수 (예: 15:00)
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      hour12: true, // 오후 3시 형태로 표시
    });
  };

  return (
    <div className="mt-8 w-full">
      <h3 className="mb-4 px-1 text-lg font-bold text-gray-800">
        시간대별 예보 (3시간 간격)
      </h3>

      {/* todo: scrollbar-hide */}
      {/* 가로 스크롤 컨테이너 */}
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {data.list.map((item) => (
          <div
            key={item.dt}
            className="flex min-w-[80px] shrink-0 flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            {/* 시간 */}
            <span className="mb-2 text-sm font-medium text-gray-500">
              {formatTime(item.dt)}
            </span>

            {/* 아이콘 */}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].main}
              className="mb-1 h-10 w-10"
            />

            {/* 온도 */}
            <span className="text-lg font-bold text-gray-800">
              {Math.round(item.main.temp)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
