'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  FileText,
  Calendar,
  Activity,
  Plus,
  ArrowRight,
  Eye,
  Search,
  Filter,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { useAuthStore } from '../../store/useAuthStore';

export default function DoctorDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { patients, prescriptions, queue } = useHospitalStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const doctorName = user?.name || 'Dr. John Smith';
  const currentDate = 'Wednesday, 19 August 2026';

  // Calculate metrics
  const totalPatients = patients.length;
  const prescriptionsToday = prescriptions.length;
  const completedAppointments = queue.filter((q) => q.status === 'Completed').length;
  const totalAppointments = queue.length;
  const pendingActions = prescriptions.filter((p) => p.status === 'Pending').length;

  const filteredPatients = showEmptyState
    ? []
    : patients.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.condition.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Doctor Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome, {doctorName} • <span className="font-medium text-gray-700 dark:text-gray-300">{currentDate}</span>
          </p>
        </div>

        <Link
          href="/doctor/prescriptions/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Prescription</span>
        </Link>
      </div>

      {/* Stat Cards Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Patients */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Patients</span>
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalPatients}</div>
            <p className="text-xs text-gray-400 mt-1">Active in system</p>
          </div>
        </div>

        {/* Card 2: Prescriptions Today */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prescriptions Today</span>
            <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{prescriptionsToday}</div>
            <p className="text-xs text-gray-400 mt-1">Created today</p>
          </div>
        </div>

        {/* Card 3: Today's Appointments */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Appointments</span>
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalAppointments}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
              {completedAppointments} completed
            </p>
          </div>
        </div>

        {/* Card 4: Pending Actions */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Actions</span>
            <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{pendingActions}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
              Awaiting pharmacy
            </p>
          </div>
        </div>
      </div>

      {/* Recent Patients Panel (Full width card) */}
      <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl shadow-card overflow-hidden">
        {/* Panel Header */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Patients</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">All patients registered in the hospital system</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Toggle demo empty state */}
            <button
              onClick={() => setShowEmptyState(!showEmptyState)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {showEmptyState ? 'Show Data' : 'Test Empty State'}
            </button>
          </div>
        </div>

        {/* Panel Content */}
        {filteredPatients.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-3">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">No recent patients</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mt-1">
              There are currently no matching patient records in the system or filters have excluded them.
            </p>
          </div>
        ) : (
          /* Populated State Table */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-gray-50/70 dark:bg-gray-800/40 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="px-6 py-3.5">Patient Info</th>
                  <th className="px-6 py-3.5">Last Visit</th>
                  <th className="px-6 py-3.5">Condition Tag</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredPatients.map((patient) => {
                  const initials = patient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('');

                  const isCritical = patient.status === 'Critical';
                  const isAdmitted = patient.status === 'Admitted';
                  const isWaiting = patient.status === 'Waiting';

                  return (
                    <tr
                      key={patient.id}
                      className="hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {patient.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {patient.id} • {patient.age} yrs, {patient.gender}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                        {patient.lastVisit}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                          {patient.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            isCritical
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                              : isAdmitted
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                              : isWaiting
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/doctor/patients/${patient.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 text-xs font-medium transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
