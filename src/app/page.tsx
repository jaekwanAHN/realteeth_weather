import { CurrentLocationButton } from '@/features/current-location/ui/CurrentLocationButton';
import { MyLocationWeather } from '@/features/current-location/ui/MyLocationWeather';
import { SearchSection } from '@/widgets/SearchSection/ui/SearchSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 pt-24">
      <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-blue-600">
        Weather App
      </h1>

      {/* 위젯 배치 */}
      <SearchSection />

      <MyLocationWeather />
    </main>
  );
}
