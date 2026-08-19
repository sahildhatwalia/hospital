'use client';

import React from 'react';
import { Users, UserCheck } from 'lucide-react';

export default function LiveQueueTable({ waitingTokens = [], inConsultationTokens = [] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Currently In Consultation */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-emerald-400 flex items-center space-x-2 mb-4">
          <UserCheck className="h-5 w-5" />
          <span>In Consultation ({inConsultationTokens.length})</span>
        </h3>
        {inConsultationTokens.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No patients currently in consultation.</p>
        ) : (
          <div className="space-y-3">
            {inConsultationTokens.map((item) => (
              <div key={item._id} className="glass-card p-4 rounded-xl flex items-center justify-between border-l-4 border-l-emerald-500">
                <div>
                  <span className="font-mono text-xl font-bold text-white">{item.tokenCode}</span>
                  <p className="text-xs text-slate-400">{item.patientId?.name || 'Patient'}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-300 block">Room</span>
                  <span className="text-sm font-bold text-emerald-300">
                    {item.doctorId?.roomNumber || 'Room 101'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Waiting List */}
      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-sky-400 flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5" />
          <span>Waiting Queue ({waitingTokens.length})</span>
        </h3>
        {waitingTokens.length === 0 ? (
          <p className="text-sm text-slate-400 italic">Queue is currently empty.</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {waitingTokens.map((item, index) => (
              <div key={item._id} className="glass-card p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-400 w-6">#{index + 1}</span>
                  <div>
                    <span className="font-mono text-base font-bold text-slate-100">{item.tokenCode}</span>
                    <span className="ml-2 text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
                      {item.tokenType}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-400">
                  Est. {item.estimatedWaitTimeMinutes}m
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
