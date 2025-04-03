import { Suspense } from 'react';
import AboutClient from '@/components/AboutClient';

// Server component for static generation
export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutClient />
    </Suspense>
  );
} 