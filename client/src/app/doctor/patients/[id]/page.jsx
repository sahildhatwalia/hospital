'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  User,
  Heart,
  Activity,
  Thermometer,
  Wind,
  FileText,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  AlertCircle,
  Phone,
  ShieldAlert,
  Calendar,
  Plus,
} from 'lucide-react';
import { useHospitalStore } from '../../../../store/useHospitalStore';

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { patients } = useHospitalStore();

  const patientId = params?.id || 'P-1001';
  const patient = patients.find((p) => p.id === patientId) || patients[0];

  const [activeTab, setActiveTab] = useState('Overview');

  const initials = patient.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  // Timeline Stepper State
  const steps = [
    { label: 'Registered', completed: true },
    { label: 'Vitals Checked', completed: true },
    { label: 'With Doctor', completed: true },
    { label: 'Prescription', completed: patient.prescriptions.length > 0 },
    { label: 'Pharmacy', completed: patient.prescriptions.some((p) => p.status === 'Dispensed') },
    { label: 'Discharged', completed: patient.status === 'Discharged' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
        <Link href="/doctor" className="hover:text-blue-600 dark:hover:text-blue-400">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/doctor/patients" className="hover:text-blue-600 dark:hover:text-blue-400">
          Patients
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-white font-semibold">{patient.name}</span>
      </nav>

      {/* Patient Journey Horizontal Stepper Timeline */}
      <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-5 shadow-card">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Patient Care Stepper</h3>
        <div className="flex items-center justify-between relative overflow-x-auto pb-2">
          {steps.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-2 min-w-max">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs transition-colors ${
                    step.completed
                      ? 'bg-green-600 text-white dark:bg-green-500'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 mt-1">
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 sm:w-20 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid Layout: Left Info Card + Right Tabs Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Patient Profile Summary Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-6 shadow-card space-y-6">
            
            {/* Header / Avatar */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md mb-3">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{patient.name}</h2>
              <span className="text-xs font-mono text-gray-400 mt-0.5">{patient.id}</span>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  {patient.status}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  Blood: {patient.bloodGroup}
                </span>
              </div>
            </div>

            {/* Demographics & Contact */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500 dark:text-gray-400">Age & Gender</span>
                <span className="font-semibold text-gray-900 dark:text-white">{patient.age} years • {patient.gender}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500 dark:text-gray-400">Primary Room</span>
                <span className="font-semibold text-gray-900 dark:text-white">{patient.roomNo}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500 dark:text-gray-400">Primary Doctor</span>
                <span className="font-semibold text-gray-900 dark:text-white">{patient.doctor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800/60">
                <span className="text-gray-500 dark:text-gray-400">Phone Contact</span>
                <span className="font-semibold text-gray-900 dark:text-white">{patient.contact}</span>
              </div>
            </div>

            {/* Red Pill Allergy Tags */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Known Medical Allergies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-300 text-xs font-semibold"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs">
              <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Emergency Contact</span>
              <p className="text-gray-600 dark:text-gray-400">{patient.emergencyContact}</p>
            </div>

            {/* Quick Action Button */}
            <Link
              href="/doctor/prescriptions/new"
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Prescribe Medication</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Main Tabbed View */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tabs Navigation Header */}
          <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-2 shadow-card flex items-center gap-2 overflow-x-auto">
            {['Overview', 'Vitals', 'Prescriptions', 'Visit History'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW & VITALS */}
          {(activeTab === 'Overview' || activeTab === 'Vitals') && (
            <div className="space-y-6">
              
              {/* Vitals Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* BP */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card">
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
                    <span className="text-xs font-medium">Blood Pressure</span>
                    <Heart className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{patient.vitals.bp}</div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 mt-1">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>Slightly elevated</span>
                  </div>
                </div>

                {/* Heart Rate */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card">
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
                    <span className="text-xs font-medium">Heart Rate</span>
                    <Activity className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{patient.vitals.heartRate}</div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-green-600 mt-1">
                    <Minus className="w-3 h-3" />
                    <span>Normal rhythm</span>
                  </div>
                </div>

                {/* Temp */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card">
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
                    <span className="text-xs font-medium">Body Temp</span>
                    <Thermometer className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{patient.vitals.temp}</div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-green-600 mt-1">
                    <Minus className="w-3 h-3" />
                    <span>Afebrile</span>
                  </div>
                </div>

                {/* SpO2 */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card">
                  <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 mb-1">
                    <span className="text-xs font-medium">SpO2 Oxygen</span>
                    <Wind className="w-4 h-4 text-teal-500" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{patient.vitals.spO2}</div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-green-600 mt-1">
                    <Minus className="w-3 h-3" />
                    <span>Good saturation</span>
                  </div>
                </div>
              </div>

              {/* Current Active Condition Box */}
              <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Active Clinical Condition</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                    {patient.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {patient.condition}
                </p>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Patient is under active continuous evaluation by {patient.doctor}. Continuous monitoring and telemetry records are updated every 4 hours.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRESCRIPTIONS */}
          {activeTab === 'Prescriptions' && (
            <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Prescribed Medications</h3>
                <Link
                  href="/doctor/prescriptions/new"
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  + Add Prescription
                </Link>
              </div>

              {patient.prescriptions.length === 0 ? (
                <p className="text-xs text-gray-400 py-6 text-center">No active prescriptions recorded for this patient.</p>
              ) : (
                <div className="space-y-4">
                  {patient.prescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                        <div>
                          <span className="font-bold text-xs text-blue-600 dark:text-blue-400 font-mono">{rx.id}</span>
                          <span className="text-xs text-gray-400 ml-2">Issued on {rx.date}</span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            rx.status === 'Dispensed'
                              ? 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {rx.status}
                        </span>
                      </div>

                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {rx.medicines.map((med, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between text-xs">
                            <div>
                              <span className="font-semibold text-gray-900 dark:text-white">{med.name}</span>
                              <span className="text-gray-500 dark:text-gray-400 ml-2">({med.dosage})</span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                              {med.frequency} • {med.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: VISIT HISTORY */}
          {activeTab === 'Visit History' && (
            <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Historical Medical Encounters</h3>
              
              <div className="relative pl-6 border-l-2 border-blue-500 dark:border-blue-600 space-y-6">
                {patient.visitHistory.map((visit) => (
                  <div key={visit.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-white dark:ring-gray-900" />
                    <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{visit.department}</span>
                        <span className="text-xs text-gray-400">{visit.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{visit.diagnosis}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{visit.notes}</p>
                      <span className="text-[10px] text-gray-400 block mt-2">Attending Doctor: {visit.doctor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
