'use client';

import React from 'react';
import { HeartPulse } from 'lucide-react';

export default function PulseLogo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-10 h-10',
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-2xl bg-gradient-to-tr from-[#0A2463] to-[#00D4FF] p-0.5 shadow-cyan-glow ${className}`}>
      <div className="w-full h-full bg-[#070F2B] rounded-[14px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00D4FF]/10 animate-pulse" />
        <HeartPulse className={`${iconSizes[size]} text-[#00D4FF] animate-heartbeat relative z-10`} />
      </div>
    </div>
  );
}
