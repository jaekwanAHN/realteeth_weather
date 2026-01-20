import { SearchSection } from "@/widgets/SearchSection/ui/SearchSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-24 bg-gray-50">
      <h1 className="text-4xl font-extrabold tracking-tight mb-10 text-blue-600">
        Weather App
      </h1>

      {/* 위젯 배치 */}
      <SearchSection />

    </main>
  );
}