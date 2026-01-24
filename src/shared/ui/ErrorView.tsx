import React from 'react';

interface ErrorViewProps {
  message?: string;
  subMessage?: string;
  action?: React.ReactNode;
  variant?: 'page' | 'section';
}

export const ErrorView = ({
  message = '오류가 발생했습니다.',
  subMessage,
  action,
  variant = 'section',
}: ErrorViewProps) => {
  const containerStyle =
    variant === 'page'
      ? 'min-h-[80vh] w-full'
      : 'h-full w-full py-10 min-h-[200px]';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${containerStyle}`}
    >
      <div className="mb-4 text-gray-300">
        <svg
          className={`text-gray-300 ${variant === 'page' ? 'h-20 w-20' : 'h-12 w-12'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3
        className={`font-bold text-gray-600 ${
          variant === 'page' ? 'text-2xl' : 'text-lg'
        }`}
      >
        {message}
      </h3>

      {subMessage && <p className="mt-2 text-sm text-gray-400">{subMessage}</p>}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
