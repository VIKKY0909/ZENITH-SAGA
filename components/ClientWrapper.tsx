'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

interface ClientWrapperProps {
  children: (searchParams: URLSearchParams) => ReactNode;
}

function ClientWrapperContent({ children }: ClientWrapperProps) {
  const searchParams = useSearchParams();
  return <>{children(searchParams)}</>;
}

export default function ClientWrapper(props: ClientWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientWrapperContent {...props} />
    </Suspense>
  );
} 