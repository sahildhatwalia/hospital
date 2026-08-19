'use client';

import React from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  Calendar,
  FileText,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  MessageSquare,
  PhoneCall,
  Activity,
} from 'lucide-react';

export default function PatientPortalPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-blue-100 text-xs font-bold uppercase tracking-wider border border-white/20">
            <HeartPulse className="w-4 h-4 text-teal-300" />
            <span>Welcome to EASPATAAL MediCore</span>
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Your Health, <br />
            <span className="text-teal-200">Simplified & Streamlined.</span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Access world-class healthcare, instant doctor appointments, real-time queue tracking, and digital prescription records all in one portal.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/receptionist"
              className="px-6 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="/patient/feedback"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/30 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Give Feedback</span>
            </Link>
          </div>
        </div>

        {/* Decorative background glow circle */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Highlights Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift space-y-3">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 w-fit">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Live OPD Queue</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Track your OPD token progress in real-time from your phone without standing in long lines.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift space-y-3">
          <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400 w-fit">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Digital Prescriptions</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Instant digital access to your doctor's prescriptions and pharmacy fulfillment status.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift space-y-3">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Top Specialists</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Consult with board-certified cardiologists, neurologists, and surgeons.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift space-y-3">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">HIPAA Secured</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Your personal medical records and vitals history are end-to-end encrypted.
          </p>
        </div>
      </section>

      {/* Emergency Contact & Feedback Banner */}
      <section className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-2xl p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
            <PhoneCall className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">24/7 Emergency Medical Response</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Call our central triage line immediately for urgent ambulance or ICU support.
            </p>
            <span className="text-base font-extrabold text-red-600 dark:text-red-400 block mt-1">
              +1 (800) 555-EMERGENCY
            </span>
          </div>
        </div>

        <Link
          href="/patient/feedback"
          className="px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span>Share Hospital Feedback</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
