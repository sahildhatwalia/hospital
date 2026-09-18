'use client';

import React, { useState, useEffect } from 'react';
import { Tv, Volume2, Clock, Calendar, Activity, HeartPulse } from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import PulseLogo from '../../components/PulseLogo';

export default function QueueDisplayTVBoard() {
  const { queue } = useHospitalStore();

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const currentServing = queue.filter((i) => i.status === 'In Progress');
  const upcomingTokens = queue.filter((i) => i.status === 'Waiting');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-[#070D1B] text-white p-6 sm:p-10 flex flex-col justify-between select-none overflow-hidden transition-colors">
      
      {/* Top Header Strip */}
      <header className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
            <HeartPulse className="w-7 h-7 text-red-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-wider text-white">AIIMS OPD TV DISPLAY</h1>
            <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">Waiting Room Counter Board</p>
          </div>
        </div>

        {/* Clock & Date Widget */}
        <div className="flex items-center gap-8 bg-slate-900/90 px-6 py-3 rounded-2xl border border-slate-800 shadow-md">
          <div className="text-right">
            <div className="text-2xl font-black font-mono text-blue-400">{currentTime}</div>
            <div className="text-xs text-slate-400 font-semibold">{currentDate}</div>
          </div>
        </div>
      </header>

      {/* Main Display Grid: Left NOW SERVING, Right UPCOMING TOKENS */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8 flex-1">
        
        {/* Left 2 Columns: NOW SERVING (Huge High-Contrast Airport Board Style) */}
        <div className="lg:col-span-2 hospital-card p-8 sm:p-10 border-2 border-blue-500/60 shadow-2xl flex flex-col justify-between relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute top-0 right-0 px-8 py-3 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-bl-3xl shadow-md">
            NOW SERVING
          </div>

          <div className="space-y-6">
            <h2 className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Active OPD Consultation Rooms</h2>

            {currentServing.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="text-4xl font-black text-slate-500 font-mono">STANDBY</div>
                <p className="text-sm text-slate-400">Awaiting next patient call from doctor desk</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentServing.map((item) => (
                  <div key={item.id} className="p-6 rounded-2xl bg-slate-950 border-2 border-blue-400 shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-400 font-extrabold uppercase tracking-wider">
                        {item.department || 'Cardiology OPD'}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold text-xs border border-emerald-800">
                        Room 104
                      </span>
                    </div>

                    <div className="text-5xl sm:text-6xl font-black text-white font-mono token-led tracking-widest">
                      {item.tokenCode || `CARD-${item.tokenNumber}`}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                      <span className="font-bold text-white">{item.patientName}</span>
                      <span className="text-slate-400 font-medium">Dr. John Smith</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Chime Alert Sound Active</span>
            </span>
            <span>AIIMS Socket Live Sync Active</span>
          </div>
        </div>

        {/* Right 1 Column: UPCOMING TOKENS List */}
        <div className="hospital-card p-6 space-y-6 flex flex-col justify-between border border-slate-800 bg-slate-900 text-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">UPCOMING OPD TOKENS</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-300 font-mono font-bold border border-blue-700">
                {upcomingTokens.length} Waiting
              </span>
            </div>

            {upcomingTokens.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">No upcoming tokens in queue.</div>
            ) : (
              <div className="space-y-3">
                {upcomingTokens.slice(0, 5).map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-blue-900/40 text-blue-400 text-xs font-bold flex items-center justify-center border border-blue-800">
                        {idx + 1}
                      </span>
                      <span className="text-xl font-bold text-white tracking-wider">
                        {item.tokenCode || `CARD-${item.tokenNumber}`}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-200 font-sans font-semibold">{item.patientName}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{item.department || 'Cardiology'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-[11px] text-slate-400">
            Please proceed to your assigned OPD consultation room when your token is called.
          </div>
        </div>

      </main>

      {/* Bottom Branding & Ticker Strip */}
      <footer className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-white">AIIMS OPD Real-Time Waiting Area Display</span>
        </div>
        <div>Emergency & Trauma Center Active 24x7</div>
      </footer>

    </div>
  );
}
