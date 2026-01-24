export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-blue-50 p-8">
      <div className="w-full max-w-2xl animate-pulse space-y-8">
        <div className="flex h-8 items-center justify-between px-4">
          <div className="h-6 w-6 rounded bg-blue-200/50"></div>
          <div className="h-8 w-8 rounded-full bg-blue-200/50"></div>
        </div>

        <div className="w-full rounded-3xl border border-white/50 bg-white p-8 text-center shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            <div className="mb-2 h-6 w-1/3 rounded bg-gray-200"></div>

            <div className="h-32 w-32 rounded-full bg-gray-200"></div>

            <div className="h-16 w-1/2 rounded bg-gray-200"></div>

            <div className="h-6 w-1/4 rounded bg-gray-200"></div>

            <div className="mt-6 grid w-full grid-cols-3 gap-4 rounded-2xl bg-gray-50 p-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-4 w-8 rounded bg-gray-200"></div>
                  <div className="h-6 w-12 rounded bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full space-y-4">
          <div className="h-6 w-40 rounded bg-blue-200/50 px-1"></div>

          <div className="flex gap-4 overflow-x-hidden pb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex min-w-[80px] shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="h-4 w-10 rounded bg-gray-200"></div>
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div className="h-6 w-8 rounded bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
