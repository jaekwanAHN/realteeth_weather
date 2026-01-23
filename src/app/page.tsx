import { MyLocationWeather } from '@/features/current-location/ui/MyLocationWeather';
import { SearchSection } from '@/widgets/SearchSection/ui/SearchSection';
import { FavoriteList } from '@/widgets/FavoriteList/ui/FavoriteList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 pt-24">
      <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-blue-600">
        Weather App
      </h1>
      <SearchSection />
      <MyLocationWeather />
      <FavoriteList />
    </main>
  );
}
