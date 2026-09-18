'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  Activity,
  BarChart3,
  Flame,
  Shield,
  Zap,
  TrendingUp,
  Terminal,
  Search,
  Plus,
  Tv,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { showToast } from '../../components/Toast';

export default function AdminDashboard() {
  const { queue, staff } = useHospitalStore();

  const [liveLogs, setLiveLogs] = useState([
    { id: 1, text: '[SYSTEM] Socket.io queue channel initialized on port 5000', time: '12:00:01' },
    { id: 2, text: '[TOKEN] CARD-042 assigned to Sophia Martinez (Priority Score: 100)', time: '12:02:14' },
    { id: 3, text: '[QUEUE] Doctor Smith called CARD-042 into Room 104', time: '12:04:30' },
    { id: 4, text: '[AUTO-ESCALATION] Token EMG-003 wait threshold breached (>30m). Bumped score to 220.', time: '12:06:55' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const mockEvents = [
        `[QUEUE_SYNC] Active tokens count refreshed across 5 departments`,
        `[DOCTOR] Dr. Amanda Chen updated status to AVAILABLE`,
        `[TOKEN] OPD-119 checked in at Reception Desk 1`,
        `[WEBSOCKET] Broadcasted TOKEN_CALLED event to patient room_1003`,
      ];
      const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setLiveLogs((prev) => [{ id: Date.now(), text: randomEvent, time: now }, ...prev.slice(0, 7)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalQueuedToday = queue.length;
  const activeDoctors = staff.filter((s) => s.role === 'Doctor' && s.status === 'Active').length;
  const efficiencyScore = 96.4;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Quick Action Shortcuts */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-[#A855F7]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">NEXLINE Admin Terminal</h1>
            <p className="text-xs text-[#A855F7] font-semibold">Real-time Hospital Queue Analytics & Operations Control</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/display"
            className="px-4 py-2.5 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-bold hover:bg-[#00D4FF] hover:text-[#070F2B] transition-all flex items-center gap-2 shadow-cyan-glow"
          >
            <Tv className="w-4 h-4" />
            <span>Launch TV Kiosk</span>
          </a>
        </div>
      </div>

      {/* Real-Time KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-5 space-y-2 border-l-4 border-l-[#00D4FF]">
          <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Total Queued Today</span>
            <Users className="w-4 h-4 text-[#00D4FF]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{totalQueuedToday}</div>
          <div className="text-[11px] text-[#00D4FF] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14% from yesterday
          </div>
        </div>

        <div className="glass-card p-5 space-y-2 border-l-4 border-l-[#10B981]">
          <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Average Wait Time</span>
            <Clock className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">8.2 mins</div>
          <div className="text-[11px] text-[#10B981] font-semibold">Optimal Threshold (&lt;15m)</div>
        </div>

        <div className="glass-card p-5 space-y-2 border-l-4 border-l-[#A855F7]">
          <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Active Doctors</span>
            <Activity className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{activeDoctors}</div>
          <div className="text-[11px] text-gray-400">Across 5 OPD Desks</div>
        </div>

        <div className="glass-card p-5 space-y-2 border-l-4 border-l-[#F59E0B]">
          <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>Efficiency Score</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{efficiencyScore}%</div>
          <div className="text-[11px] text-amber-400 font-semibold">Fintech-grade Queue Flow</div>
        </div>
      </div>

      {/* Trading-Terminal Style Live Queue Feed */}
      <div className="glass-card p-6 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#00D4FF]" />
            <h2 className="text-base font-bold text-white tracking-wide">Live Activity Terminal Feed</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" /> LIVE SOCKET STREAM
          </span>
        </div>

        <div className="space-y-2 bg-black/60 p-4 rounded-xl border border-white/10 max-h-60 overflow-y-auto">
          {liveLogs.map((log) => (
            <div key={log.id} className="text-xs flex items-start gap-3">
              <span className="text-[#00D4FF] font-bold shrink-0">{log.time}</span>
              <span className="text-gray-300 leading-relaxed">{log.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Department Heatmap & Load Balance */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-lg font-bold text-white">Department Queue Heatmap & Load Balancer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            { dept: 'Cardiology', count: 18, color: 'bg-[#00D4FF]', wait: '12m' },
            { dept: 'Neurology', count: 12, color: 'bg-purple-500', wait: '8m' },
            { dept: 'Orthopedics', count: 9, color: 'bg-[#10B981]', wait: '5m' },
            { dept: 'Pediatrics', count: 6, color: 'bg-amber-400', wait: '4m' },
            { dept: 'Emergency', count: 24, color: 'bg-red-500', wait: '0m' },
          ].map((d) => (
            <div key={d.dept} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{d.dept}</span>
                <span className="text-gray-400 font-mono">{d.wait}</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${d.color}`} style={{ width: `${Math.min(100, d.count * 4)}%` }} />
              </div>
              <div className="text-[11px] text-gray-400 text-right font-mono">{d.count} tokens queued</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
