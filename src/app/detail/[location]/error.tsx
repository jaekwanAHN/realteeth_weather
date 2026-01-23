'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/shared/ui/ErrorView';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]); 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8">
      <ErrorView
        variant="page"
        message={error.message || '오류가 발생했습니다.'}
        subMessage="잠시 후 다시 시도해주세요."
        action={
          <button
            onClick={() => reset()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            다시 시도하기
          </button>
        }
      />
    </main>
  );
}
