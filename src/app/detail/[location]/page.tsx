import { resolveGeoData } from '@/entities/location/lib/resolveGeoData';
import { getCurrentWeatherAction } from '@/entities/weather/api/weatherAction';
import { CurrentWeatherCard } from '@/widgets/CurrentWeather/ui/CurrentWeatherCard';
import { DetailHeader } from '@/widgets/DetailHeader/DetailHeader';
import { HourlyForecast } from '@/widgets/WeatherForcast/ui/HourlyForecast';
import { notFound } from 'next/navigation';

interface DetailPageProps {
  params: Promise<{
    location: string;
  }>;
  searchParams: Promise<{
    lat?: string;
    lon?: string;
  }>;
}

export default async function DetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const { location } = await params;
  const { lat, lon } = await searchParams;
  const locationName = decodeURIComponent(location);

  const geoData = await resolveGeoData(locationName, lat, lon);

  if (!geoData) notFound();

  const { success, data } = await getCurrentWeatherAction(
    geoData.lat,
    geoData.lon
  );

  if (!success || !data) {
    throw new Error('날씨 정보를 불러오는데 실패했습니다.');
  }
  const { weather: weatherData, forecast: forecastData } = data;

  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-50 p-8">
      <div className="w-full max-w-2xl space-y-8">
        <DetailHeader
          locationName={locationName}
          lat={geoData.lat}
          lon={geoData.lon}
        />
        {weatherData ? (
          <CurrentWeatherCard data={weatherData} locationName={locationName} />
        ) : (
          <div className="py-10 text-center text-red-500">
            날씨 정보를 불러오는데 실패했습니다.
          </div>
        )}
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
