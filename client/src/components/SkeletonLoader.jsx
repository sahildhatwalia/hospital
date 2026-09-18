'use client';

import React from 'react';

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-white/10 rounded w-1/3"></div>
        <div className="h-6 bg-white/10 rounded-full w-12"></div>
      </div>
      <div className="h-8 bg-white/10 rounded w-2/3"></div>
      <div className="h-3 bg-white/10 rounded w-1/2"></div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="glass-card overflow-hidden animate-pulse">
      <div className="p-4 border-b border-white/10 flex justify-between">
        <div className="h-5 bg-white/10 rounded w-1/4"></div>
        <div className="h-5 bg-white/10 rounded w-1/6"></div>
      </div>
      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-white/10 rounded-full shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-3 bg-white/10 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-white/10 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
