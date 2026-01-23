import Link from 'next/link';
import { ErrorView } from '@/shared/ui/ErrorView';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8">
      <ErrorView
        variant="page"
        message="해당 장소를 찾을 수 없습니다."
        subMessage="검색어나 주소가 정확한지 확인해주세요."
        action={
          <Link
            href="/"
            className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
          >
            홈으로 돌아가기
          </Link>
        }
      />
    </main>
  );
}
