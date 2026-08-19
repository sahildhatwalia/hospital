'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Clock, CheckCircle2, UserCheck, Play, ArrowRight, Sparkles } from 'lucide-react';
import { useHospitalStore } from '../../../store/useHospitalStore';
import { showToast } from '../../../components/Toast';

export default function QueuePage() {
  const { queue, callNextQueue, completeQueueItem } = useHospitalStore();
  const [activeFilter, setActiveFilter] = useState('All');

  const filterChips = ['All', 'Waiting', 'In Progress', 'Completed'];

  const filteredQueue = queue.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.status === activeFilter;
  });

  const nextWaitingItem = queue.find((q) => q.status === 'Waiting');
  const activeItem = queue.find((q) => q.status === 'In Progress');

  const handleCallNext = () => {
    if (!nextWaitingItem) {
      showToast('No patients currently in Waiting queue.', 'info');
      return;
    }
    callNextQueue(nextWaitingItem.id);
    showToast(`Called token ${nextWaitingItem.id} (${nextWaitingItem.patientName}) to Consultation Desk!`, 'success');
  };

  const handleCompleteCurrent = (id) => {
    completeQueueItem(id);
    showToast('Consultation marked as Completed!', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Live OPD Queue Board
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time outpatient queue management for consultation desks
          </p>
        </div>

        {/* Primary Call Next Button */}
        <button
          onClick={handleCallNext}
          disabled={!nextWaitingItem}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Call Next Patient ({nextWaitingItem ? nextWaitingItem.id : 'None'})</span>
        </button>
      </div>

      {/* Active Consultation Spotlight Banner */}
      {activeItem && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl border border-white/30 shrink-0">
              {activeItem.id}
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-blue-200 block">
                Currently In Consultation Room
              </span>
              <h2 className="text-xl font-bold">{activeItem.patientName}</h2>
              <p className="text-xs text-blue-100 mt-0.5">
                {activeItem.age} yrs, {activeItem.gender} • Reason: {activeItem.reason}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/doctor/patients/${activeItem.patientId}`}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-colors"
            >
              Open Medical Record
            </Link>
            <button
              onClick={() => handleCompleteCurrent(activeItem.id)}
              className="px-4 py-2 rounded-xl bg-white text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm"
            >
              Mark Completed
            </button>
          </div>
        </div>
      )}

      {/* Filter Pills */}
      <div className="flex items-center justify-between bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] p-4 rounded-xl shadow-card">
        <div className="flex items-center gap-2 overflow-x-auto">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip;
            return (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 hidden sm:inline">
          Showing {filteredQueue.length} tokens
        </span>
      </div>

      {/* Queue Tokens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQueue.map((item) => {
          const isWaiting = item.status === 'Waiting';
          const isInProgress = item.status === 'In Progress';
          const isCompleted = item.status === 'Completed';

          return (
            <div
              key={item.id}
              className={`p-5 rounded-xl bg-white dark:bg-[#1A1D23] border transition-all card-hover-lift flex flex-col justify-between ${
                isInProgress
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                  : 'border-gray-200 dark:border-[#2D3748] shadow-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-sm font-extrabold text-gray-900 dark:text-white">
                    {item.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      isWaiting
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        : isInProgress
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300'
                        : 'bg-green-100 text-green-700 dark:bg-green-950/70 dark:text-green-300'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white">{item.patientName}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.age} yrs, {item.gender} • Reason: <span className="font-medium text-gray-700 dark:text-gray-300">{item.reason}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Wait time: <strong className="text-gray-700 dark:text-gray-300">{item.waitTime}</strong></span>
                </div>

                {isWaiting && (
                  <button
                    onClick={() => callNextQueue(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 font-semibold transition-colors"
                  >
                    Call Now
                  </button>
                )}
                {isInProgress && (
                  <button
                    onClick={() => handleCompleteCurrent(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-950/50 hover:bg-green-600 hover:text-white text-green-600 dark:text-green-400 font-semibold transition-colors"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
