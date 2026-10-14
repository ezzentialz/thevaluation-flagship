'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="text-8xl font-display font-bold text-brand-gold mb-4">500</div>
        <h2 className="text-2xl text-white mb-4">เกิดข้อผิดพลาด</h2>
        <p className="text-white/60 mb-8">Something went wrong. Please try again.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            ลองใหม่
          </button>
          <Link href="/" className="btn-secondary">
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}