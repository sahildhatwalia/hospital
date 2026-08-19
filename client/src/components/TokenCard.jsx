'use client';

import React from 'react';
import { Clock, Ticket, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function TokenCard({ token }) {
  if (!token) return null;

  const isEmergency = token.tokenType === 'EMERGENCY';

  return (
    <div className={`glass-card p-6 rounded-2xl relative overflow-hidden ${
      isEmergency ? 'border-amber-500/50 bg-amber-500/10' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center space-x-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
          <Ticket className="h-4 w-4" />
          <span>Active Token</span>
        </span>
        {isEmergency && (
          <span className="flex items-center space-x-1 px-2.5 py-1 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>EMERGENCY</span>
          </span>
        )}
      </div>

      <div className="text-center my-4">
        <h2 className="text-5xl font-black tracking-tight text-white font-mono drop-shadow-md">
          {token.tokenCode}
        </h2>
        <p className="text-sm text-slate-400 mt-1">Sequence #{token.displaySequence}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-center">
        <div>
          <span className="text-xs text-slate-400 block mb-1">Status</span>
          <span className={`px-2.5 py-1 text-xs font-bold rounded-md inline-block uppercase ${
            token.status === 'WAITING' ? 'bg-sky-500/20 text-sky-300' :
            token.status === 'IN_CONSULTATION' ? 'bg-emerald-500/20 text-emerald-300 animate-pulse' :
            'bg-slate-500/20 text-slate-300'
          }`}>
            {token.status.replace('_', ' ')}
          </span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block mb-1">Est. Wait</span>
          <span className="text-sm font-semibold text-slate-200 flex items-center justify-center space-x-1">
            <Clock className="h-3.5 w-3.5 text-sky-400" />
            <span>{token.estimatedWaitTimeMinutes} mins</span>
          </span>
        </div>
      </div>
    </div>
  );
}
