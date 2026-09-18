'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Sparkles,
  CheckCircle2,
  Activity,
  Clock,
  Users,
  Shield,
  Stethoscope,
  Tv,
  Zap,
  Bell,
  Building2,
  Calendar,
  PhoneCall,
  FileText,
  AlertTriangle,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { showToast } from '../components/Toast';
import PulseLogo from '../components/PulseLogo';

export default function LandingLoginPage() {
  const router = useRouter();
  const { switchRole } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState('DOCTOR');
  const [username, setUsername] = useState('dr.smith@easpataal.com');
  const [password, setPassword] = useState('password123');
  const [showDemoBox, setShowDemoBox] = useState(false);

  // Live counter animation states
  const [servedCount, setServedCount] = useState(142);
  const [avgWait, setAvgWait] = useState(8);
  const [activeQueues, setActiveQueues] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setServedCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const demoRoles = [
    {
      roleKey: 'DOCTOR',
      title: 'Doctor OPD Portal',
      description: 'Manage OPD consultation rooms & call next patient token in 1 click.',
      name: 'Dr. John Smith',
      user: 'dr.smith@easpataal.com',
      pass: 'doctor123',
      icon: Stethoscope,
      accent: 'border-blue-500 text-blue-700 dark:text-blue-400',
      badgeColor: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700',
    },
    {
      roleKey: 'RECEPTIONIST',
      title: 'Reception Intake Desk',
      description: 'Fast OPD token registration & Emergency Bump queue management.',
      name: 'Michael Chang',
      user: 'frontdesk.m@easpataal.com',
      pass: 'reception123',
      icon: Users,
      accent: 'border-emerald-500 text-emerald-700 dark:text-emerald-400',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700',
    },
    {
      roleKey: 'ADMIN',
      title: 'Hospital Admin Portal',
      description: 'Real-time department heatmap, staff control & operational metrics.',
      name: 'Sarah Jenkins',
      user: 'admin.sarah@easpataal.com',
      pass: 'admin123',
      icon: Shield,
      accent: 'border-purple-500 text-purple-700 dark:text-purple-400',
      badgeColor: 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700',
    },
    {
      roleKey: 'PATIENT',
      title: 'Patient Queue Tracker',
      description: 'Live departure board status tracking & instant SMS ticket updates.',
      name: 'Sophia Martinez',
      user: 'patient.sophia@easpataal.com',
      pass: 'patient123',
      icon: UserCheck,
      accent: 'border-amber-500 text-amber-700 dark:text-amber-400',
      badgeColor: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700',
    },
  ];

  const notices = [
    {
      id: 1,
      date: '04 SEP 2026',
      title: 'OPD Ticket Registration Timings Update',
      desc: 'Morning OPD registration counter opens at 07:30 AM. Online booking available 24x7.',
      badge: 'IMPORTANT',
    },
    {
      id: 2,
      date: '03 SEP 2026',
      title: 'New Tele-Consultation & Queue Calling Kiosks Active',
      desc: 'Patients can now check room calling numbers directly on Waiting Area TV screens.',
      badge: 'NEW SERVICE',
    },
    {
      id: 3,
      date: '01 SEP 2026',
      title: 'Cardiology & Neurology OPD Clinic Schedule',
      desc: 'Specialist doctors available from 09:00 AM to 02:00 PM at Main Block, Ground Floor.',
      badge: 'CLINIC INFO',
    },
  ];

  const handleAutofill = (demo) => {
    setSelectedRole(demo.roleKey);
    setUsername(demo.user);
    setPassword(demo.pass);
    showToast(`Autofilled credentials for ${demo.name} (${demo.roleKey})`, 'info');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    switchRole(selectedRole);
    showToast(`Welcome back, logged in as ${selectedRole}`, 'success');

    if (selectedRole === 'DOCTOR') router.push('/doctor');
    else if (selectedRole === 'ADMIN') router.push('/admin');
    else if (selectedRole === 'RECEPTIONIST') router.push('/receptionist');
    else router.push('/patient');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Official Announcement Marquee Ticker */}
      <div className="bg-red-600 text-white rounded-lg shadow-sm overflow-hidden flex items-center border border-red-700">
        <div className="bg-red-800 px-4 py-2 text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-md z-10">
          <Bell className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>IMPORTANT ANNOUNCEMENT:</span>
        </div>
        <div className="overflow-hidden relative w-full py-2 px-2 text-xs font-semibold">
          <div className="animate-marquee space-x-8">
            <span>🚨 OPD Ticket Registration remains active 24x7 on this portal.</span>
            <span>• Emergency Trauma Center open round-the-clock at Main Block Gate 1.</span>
            <span>• Check live room token numbers on Waiting Area Display TVs or Patient Portal.</span>
            <span>• Please bring your valid Photo ID & OPD Ticket printout for fast consultation.</span>
          </div>
        </div>
      </div>

      {/* 2. Official AIIMS Hero Section */}
      <div className="hospital-card p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-[#0F2C59] to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
            <Building2 className="w-4 h-4 text-blue-300" />
            <span>AIIMS Healthcare & Smart Queue System</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            AIIMS OPD Registration & Real-Time Queue Calling System
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Welcome to the official patient queue management portal of All India Institute of Medical Sciences. Designed for seamless token registration, automated counter calling, live TV displays, and doctor consultation management.
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/patient"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Patient Token Check-In</span>
            </Link>

            <Link
              href="/display"
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Tv className="w-4 h-4 text-cyan-300" />
              <span>Launch Waiting Room TV Kiosk</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Live Hospital Statistics Ticker */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="hospital-card p-4 flex items-center gap-4 border-l-4 border-l-blue-600 dark:border-l-blue-400">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{servedCount}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Patients Served Today</div>
          </div>
        </div>

        <div className="hospital-card p-4 flex items-center gap-4 border-l-4 border-l-emerald-600 dark:border-l-emerald-400">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{avgWait} Mins</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Average OPD Wait Time</div>
          </div>
        </div>

        <div className="hospital-card p-4 flex items-center gap-4 border-l-4 border-l-purple-600 dark:border-l-purple-400">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{activeQueues}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Active Department Clinics</div>
          </div>
        </div>
      </div>

      {/* 4. Portal Login & Role Selection Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Quick Service Portals */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>AIIMS Service Portals</span>
            </h2>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Select portal to access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {demoRoles.map((roleItem) => {
              const Icon = roleItem.icon;
              return (
                <div
                  key={roleItem.roleKey}
                  onClick={() => {
                    setSelectedRole(roleItem.roleKey);
                    setUsername(roleItem.user);
                    setPassword(roleItem.pass);
                  }}
                  className="hospital-card-interactive p-4 cursor-pointer flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${roleItem.badgeColor}`}>
                      {roleItem.roleKey}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {roleItem.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {roleItem.description}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 pt-2">
                    <span>Quick Autofill</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notice Board Panel */}
          <div className="hospital-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>AIIMS Notices & Circulars</span>
              </h3>
              <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400">View All Bulletins</span>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400">{n.date}</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                      {n.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{n.title}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Portal Authentication Login Box */}
        <div className="lg:col-span-5">
          <div className="hospital-card p-6 space-y-6 shadow-xl border-t-4 border-t-blue-700">
            
            <div className="text-center space-y-1 border-b border-gray-200 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Portal Sign-In</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Select target role and enter credentials to sign in
              </p>
            </div>

            {/* Role Switch Tabs */}
            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map((roleItem) => {
                const isSelected = selectedRole === roleItem.roleKey;
                return (
                  <button
                    key={roleItem.roleKey}
                    type="button"
                    onClick={() => {
                      setSelectedRole(roleItem.roleKey);
                      setUsername(roleItem.user);
                      setPassword(roleItem.pass);
                    }}
                    className={`p-2.5 rounded-lg text-left text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span>{roleItem.roleKey}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                    </div>
                    <div className="text-[11px] font-normal text-gray-500 dark:text-gray-400 truncate">
                      {roleItem.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  User ID / Email Address
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. dr.smith@easpataal.com"
                  required
                  className="w-full px-3.5 py-2 rounded-lg hospital-input text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2 rounded-lg hospital-input text-xs font-medium"
                />
              </div>

              {/* Demo Autofill Switcher */}
              <button
                type="button"
                onClick={() => setShowDemoBox(!showDemoBox)}
                className="w-full py-2 px-3 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{showDemoBox ? 'Hide Demo Users' : 'Quick Demo Users'}</span>
              </button>

              {showDemoBox && (
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 space-y-1.5 animate-in fade-in">
                  {demoRoles.map((demo) => (
                    <button
                      key={demo.roleKey}
                      type="button"
                      onClick={() => handleAutofill(demo)}
                      className="w-full p-2 rounded-md bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 text-left flex items-center justify-between text-xs transition-colors border border-gray-100 dark:border-slate-600"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white">{demo.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${demo.badgeColor}`}>
                        {demo.roleKey}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-[#0F2C59] hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In to {selectedRole} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-3 border-t border-gray-200 dark:border-slate-800 text-center flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Encrypted AIIMS HIPAA-Compliant Queue Session</span>
            </div>

          </div>
        </div>

      </div>

      {/* 5. Official AIIMS Hospital Footer */}
      <footer className="hospital-card p-6 bg-slate-900 text-white space-y-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div>
            <div className="font-bold text-white text-sm mb-2">AIIMS NEW DELHI CAMPUS</div>
            <p className="leading-relaxed">
              All India Institute of Medical Sciences<br />
              Ansari Nagar, Ring Road, New Delhi - 110029<br />
              OPD Registration Helpdesk: Gate No. 2
            </p>
          </div>

          <div>
            <div className="font-bold text-white text-sm mb-2">24x7 HELPLINE NUMBERS</div>
            <p className="leading-relaxed">
              Emergency Services: 011-26588500 / 26588700<br />
              Toll Free Health Helpline: 1800-11-2443<br />
              OPD Ticket Enquiry: opd.helpdesk@aiims.edu
            </p>
          </div>

          <div>
            <div className="font-bold text-white text-sm mb-2">PATIENT CARE PORTAL</div>
            <p className="leading-relaxed">
              Official OPD token & counter management system.<br />
              Designed for automated counter calling & real-time patient queue orchestration.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>© 2026 AIIMS Healthcare & Queue Portal. All Rights Reserved.</span>
          <span>Version 3.2.0 • Socket Live Connection Active</span>
        </div>
      </footer>

    </div>
  );
}

