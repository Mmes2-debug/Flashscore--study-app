"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(portal)');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-white text-xl">Loading Sports Central...</div>
      </div>
    </div>
  );
}