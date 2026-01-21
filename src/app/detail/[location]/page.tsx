import { notFound } from 'next/navigation';
import { getGeoLocation } from '@/entities/location/api/geocode';
import { HourlyForecast } from '@/widgets/WeatherForcast/ui/HourlyForecast';
import { getDetailData } from '@/views/detail/api/getDetailData';
import { CurrentWeatherCard } from '@/widgets/CurrentWeather/ui/CurrentWeatherCard';

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
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8">
        <div className="font-bold text-red-500">좌표를 찾을 수 없습니다.</div>
      </main>
    );
  }

  const { weather: weatherData, forecast: forecastData } = await getDetailData(
    geoData.lat,
    geoData.lon
  );

  // 3. 서버 로그 확인 (데이터 구조 파악용)
  console.log(weatherData);
  console.log(`\n--- [Weather Data] ---`);
  console.log(`Temp : ${weatherData?.main.temp}°C`);
  console.log(`Desc : ${weatherData?.weather[0].description}`);
  console.log(`----------------------\n`);

  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-50 p-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* [리팩토링] 복잡한 UI 코드가 위젯 하나로 깔끔하게 정리됨 */}
        {weatherData ? (
          <CurrentWeatherCard
            data={weatherData}
            locationName={locationName} // 페이지 제목 역할도 위젯에게 위임
          />
        ) : (
          <div className="py-10 text-center text-red-500">
            날씨 정보를 불러오는데 실패했습니다.
          </div>
        )}

        {/* 시간대별 예보 위젯 */}
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
