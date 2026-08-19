'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, FileText, Calendar, Activity, Pill, Users, Settings, X, ChevronRight } from 'lucide-react';
import { useHospitalStore } from '../store/useHospitalStore';
import { useAuthStore } from '../store/useAuthStore';

export default function CommandPalette({ isOpen, onClose }) {
  const router = RouterHook();
  const [query, setQuery] = useState('');
  const { patients } = useHospitalStore();
  const { role } = useAuthStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event if needed
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase()) ||
      p.condition.toLowerCase().includes(query.toLowerCase())
  );

  const quickNav = [
    { title: 'Doctor Dashboard', path: '/doctor', icon: Activity, roles: ['DOCTOR', 'ADMIN'] },
    { title: 'Patients List', path: '/doctor/patients', icon: User, roles: ['DOCTOR', 'ADMIN', 'RECEPTIONIST'] },
    { title: 'OPD Queue Board', path: '/doctor/queue', icon: Calendar, roles: ['DOCTOR', 'RECEPTIONIST'] },
    { title: 'New Prescription', path: '/doctor/prescriptions/new', icon: FileText, roles: ['DOCTOR'] },
    { title: 'Admin Overview', path: '/admin', icon: Settings, roles: ['ADMIN'] },
    { title: 'Receptionist Check-in', path: '/receptionist', icon: Users, roles: ['RECEPTIONIST', 'ADMIN'] },
    { title: 'Pharmacy Inventory', path: '/pharmacist', icon: Pill, roles: ['PHARMACIST', 'ADMIN'] },
  ].filter((item) => item.roles.includes(role));

  const handleSelectRoute = (path) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search patients, medical records, or navigation (Press Esc to close)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-gray-800/50">
          {/* Quick Navigation Section */}
          <div className="py-2">
            <p className="px-3 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quick Navigation</p>
            {quickNav.map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.path}
                  onClick={() => handleSelectRoute(nav.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {nav.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              );
            })}
          </div>

          {/* Patients Search Results */}
          <div className="py-2">
            <p className="px-3 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Patients ({filteredPatients.length})
            </p>
            {filteredPatients.length === 0 ? (
              <p className="px-3 py-2 text-xs text-gray-400">No matching patients found.</p>
            ) : (
              filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => handleSelectRoute(`/doctor/patients/${patient.id}`)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {patient.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {patient.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-mono">
                          {patient.id}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{patient.condition}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{patient.roomNo}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}

function RouterHook() {
  return useRouter();
}
