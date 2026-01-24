import { WeatherData } from '@/entities/weather/model/types';
import { API_URLS } from '@/shared/config/constants';

interface CurrentWeatherCardProps {
  data: WeatherData;
  locationName?: string;
}

export const CurrentWeatherCard = ({
  data,
  locationName,
}: CurrentWeatherCardProps) => {
  return (
    <div className="mx-auto min-h-[460px] w-full max-w-md rounded-3xl border border-white/50 bg-white p-8 text-center shadow-lg">
      <div className="space-y-6">
        {(locationName || data.name) && (
          <h2 className="text-xl font-bold text-gray-700">
            📍 {locationName || data.name}
          </h2>
        )}

        <div className="flex flex-col items-center justify-center">
          <img
            src={`${API_URLS.OPEN_WEATHER_IMG}/img/wn/${data.weather[0].icon}@4x.png`}
            alt={data.weather[0].description}
            className="h-32 w-32 drop-shadow-md"
          />
          <h2 className="text-6xl font-extrabold tracking-tighter text-gray-800">
            {Math.round(data.main.temp)}°
          </h2>
          <p className="mt-2 text-xl font-medium text-gray-500">
            {data.weather[0].description}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-gray-50 p-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">최고</span>
            <span className="text-lg font-bold text-gray-700">
              {Math.round(data.main.temp_max)}°
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">최저</span>
            <span className="text-lg font-bold text-gray-700">
              {Math.round(data.main.temp_min)}°
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">습도</span>
            <span className="text-lg font-bold text-gray-700">
              {data.main.humidity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
