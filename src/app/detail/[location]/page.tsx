import { notFound } from 'next/navigation';
import { getGeoLocation } from '@/entities/location/api/geocode';
// 1. 날씨 API 함수 import
import {
  getCurrentWeather,
  getHourlyForecast,
} from '@/entities/weather/api/weather';
import { HourlyForecast } from '@/widgets/WeatherForcast/ui/HourlyForecast';

interface DetailPageProps {
  params: Promise<{
    location: string;
  }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { location } = await params;
  const locationName = decodeURIComponent(location);

  if (!locationName) return notFound();

  // 1. 좌표 구하기 (Geocoding)
  const searchKeyword = locationName.split('-').pop() || locationName;
  const geoData = await getGeoLocation(searchKeyword);

  if (!geoData) {
    return <div>좌표를 찾을 수 없습니다.</div>; // 간단한 에러 처리
  }

  // 2. 날씨 데이터 구하기 (Weather API) -> 좌표가 있어야 호출 가능
  // const weatherData = await getCurrentWeather({
  //   lat: geoData.lat,
  //   lon: geoData.lon,
  // });

  const [weatherData, forecastData] = await Promise.all([
    getCurrentWeather({ lat: geoData.lat, lon: geoData.lon }),
    getHourlyForecast({ lat: geoData.lat, lon: geoData.lon }),
  ]);

  // 3. 서버 로그 확인 (데이터 구조 파악용)
  console.log(`\n--- [Weather Data] ---`);
  console.log(`Temp : ${weatherData?.main.temp}°C`);
  console.log(`Desc : ${weatherData?.weather[0].description}`);
  console.log(`----------------------\n`);

  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-50 p-8">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          📍 {locationName}
        </h1>

        {/* 날씨 정보 카드 */}
        <div className="rounded-3xl border border-white/50 bg-white p-8 text-center shadow-lg">
          {weatherData ? (
            <div className="space-y-6">
              {/* 메인 날씨 아이콘 & 온도 */}
              <div className="flex flex-col items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                  alt={weatherData.weather[0].description}
                  className="h-32 w-32 drop-shadow-md"
                />
                <h2 className="text-6xl font-extrabold tracking-tighter text-gray-800">
                  {Math.round(weatherData.main.temp)}°
                </h2>
                <p className="mt-2 text-xl font-medium text-gray-500">
                  {weatherData.weather[0].description}
                </p>
              </div>

              {/* 상세 정보 그리드 */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl bg-gray-50 p-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">최고 기온</span>
                  <span className="text-lg font-bold text-gray-700">
                    {Math.round(weatherData.main.temp_max)}°
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">최저 기온</span>
                  <span className="text-lg font-bold text-gray-700">
                    {Math.round(weatherData.main.temp_min)}°
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">습도</span>
                  <span className="text-lg font-bold text-gray-700">
                    {weatherData.main.humidity}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-500">
              날씨 정보를 불러오는데 실패했습니다.
            </div>
          )}
        </div>

        {forecastData && <HourlyForecast data={forecastData} />}

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-500 hover:underline">
            ← 다른 지역 검색하기
          </a>
        </div>
      </div>
    </main>
  );
}
