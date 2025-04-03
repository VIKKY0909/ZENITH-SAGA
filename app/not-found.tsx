'use client';

import Link from 'next/link';
import ClientWrapper from '@/components/ClientWrapper';

export default function NotFound() {
  return (
    <ClientWrapper>
      {() => (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-8">Page Not Found</h2>
            <p className="text-gray-500 mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      )}
    </ClientWrapper>
  );
} 