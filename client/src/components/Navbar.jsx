'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  Sun,
  Moon,
  Search,
  CheckSquare,
  HeartPulse,
  LogOut,
  Home,
  MessageSquare,
  PhoneCall,
  Shield,
  Stethoscope,
  Tv,
  ChevronDown,
  Globe,
} from 'lucide-react';

import { useAuthStore } from '../store/useAuthStore';
import { useHospitalStore } from '../store/useHospitalStore';
import NotificationsDropdown from './NotificationsDropdown';
import CommandPalette from './CommandPalette';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, switchRole, darkMode, toggleDarkMode, logout } = useAuthStore();
  const { notifications } = useHospitalStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // normal, lg, xl

  useEffect(() => {
    const handleCmdOpen = () => setIsCmdOpen(true);
    window.addEventListener('open-command-palette', handleCmdOpen);
    return () => window.removeEventListener('open-command-palette', handleCmdOpen);
  }, []);

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  const roleAccentColor =
    role === 'DOCTOR'
      ? '#2563EB'
      : role === 'ADMIN'
      ? '#7C3AED'
      : role === 'RECEPTIONIST'
      ? '#059669'
      : '#0284C7';

  // Navigation Links based on role
  const getNavLinks = () => {
    if (role === 'DOCTOR') {
      return [
        { label: 'Doctor Dashboard', href: '/doctor', icon: Activity },
        { label: 'OPD Patients', href: '/doctor/patients', icon: Users },
        { label: 'Live OPD Queue', href: '/doctor/queue', icon: Calendar },
        { label: 'Prescriptions', href: '/doctor/prescriptions/new', icon: FileText },
      ];
    }
    if (role === 'ADMIN') {
      return [
        { label: 'Admin Portal', href: '/admin', icon: Activity },
        { label: 'Waiting Room TV Kiosk', href: '/display', icon: Tv },
        { label: 'Staff Management', href: '/admin#staff', icon: Users },
        { label: 'OPD Analytics', href: '/admin#reports', icon: BarChart3 },
      ];
    }
    if (role === 'RECEPTIONIST') {
      return [
        { label: 'Reception Desk', href: '/receptionist', icon: Activity },
        { label: 'Queue Board', href: '/display', icon: Tv },
        { label: 'Patient Registry', href: '/doctor/patients', icon: Users },
        { label: 'Fast Check-In', href: '/receptionist#checkin', icon: CheckSquare },
      ];
    }
    if (role === 'PATIENT') {
      return [
        { label: 'Patient Portal', href: '/patient', icon: Home },
        { label: 'Live TV Board', href: '/display', icon: Tv },
        { label: 'Patient Feedback', href: '/patient/feedback', icon: MessageSquare },
      ];
    }
    return [
      { label: 'Home / Portal Sign-In', href: '/', icon: Home },
      { label: 'OPD Ticket Check-in', href: '/patient', icon: CheckSquare },
      { label: 'Live Waiting Area Display', href: '/display', icon: Tv },
    ];
  };

  const navLinks = getNavLinks();

  const isLinkActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  const roles = [
    { key: 'DOCTOR', name: 'Doctor Portal', icon: Stethoscope },
    { key: 'RECEPTIONIST', name: 'Reception Desk', icon: Users },
    { key: 'ADMIN', name: 'Hospital Admin', icon: Shield },
    { key: 'PATIENT', name: 'Patient Portal', icon: Home },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-md transition-colors">
        
        {/* Top Utility Bar (AIIMS Helpline & Accessibility Bar) */}
        <div className="bg-[#0A1A3A] dark:bg-[#070D1B] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-blue-900/40">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            
            {/* Left: Emergency Helpline */}
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-red-300 font-semibold animate-pulse">
                <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                <span>24x7 Emergency Helpline: 011-26588500 / 1800-11-2443</span>
              </span>
              <span className="hidden md:inline text-blue-300/60">|</span>
              <span className="hidden md:inline text-blue-200">
                AIIMS Medical Center • OPD Patient Queue System
              </span>
            </div>

            {/* Right: Theme Toggle & Quick Accessibility Controls */}
            <div className="flex items-center gap-3">
              {/* Quick Role Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-100 border border-blue-700/50 text-[11px] font-medium transition-colors"
                >
                  <Globe className="w-3 h-3 text-blue-300" />
                  <span>Role: {role}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-1 text-gray-800 dark:text-gray-200 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-slate-700">
                      Switch Role Portal
                    </div>
                    {roles.map((r) => {
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.key}
                          onClick={() => {
                            switchRole(r.key);
                            setIsRoleDropdownOpen(false);
                            if (r.key === 'DOCTOR') router.push('/doctor');
                            else if (r.key === 'ADMIN') router.push('/admin');
                            else if (r.key === 'RECEPTIONIST') router.push('/receptionist');
                            else router.push('/patient');
                          }}
                          className={`w-full px-3 py-1.5 text-left text-xs flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-slate-700/80 transition-colors ${
                            role === r.key ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-slate-700/50' : ''
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{r.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Theme Toggle (Light / Dark) */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-100 text-[11px] font-semibold border border-blue-700/50 transition-colors"
                title="Toggle Light / Dark Mode"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-200" />
                    <span>Dark Theme</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AIIMS Header Section with Logo Crest */}
        <div className="bg-white dark:bg-[#0F172A] border-b border-gray-200 dark:border-slate-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
            
            {/* AIIMS Hospital Crest & Branding */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-12 h-12 rounded-xl bg-[#0F2C59] dark:bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <HeartPulse className="w-7 h-7 text-red-400 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-red-600 dark:text-red-400 tracking-wider">
                  अखिल भारतीय आयुर्विज्ञान संस्थान, नई दिल्ली
                </div>
                <h1 className="text-lg sm:text-xl font-black text-[#0F2C59] dark:text-white tracking-tight leading-tight">
                  ALL INDIA INSTITUTE OF MEDICAL SCIENCES
                </h1>
                <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 tracking-wide">
                  AIIMS OPD & Queue Management System
                </div>
              </div>
            </Link>

            {/* Quick Search & User Profile */}
            <div className="flex items-center gap-3">
              {/* Command Search */}
              <button
                onClick={() => setIsCmdOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
              >
                <Search className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Search OPD & Tokens...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-slate-900 text-gray-500 border border-gray-300 dark:border-slate-700 rounded font-mono shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 text-blue-800 dark:text-blue-300" />
                  {unreadNotifs > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                  )}
                </button>
                <NotificationsDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
              </div>

              {/* Logged User Info */}
              {user ? (
                <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 dark:border-slate-800">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      {user.role} Portal
                    </span>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                    style={{ backgroundColor: roleAccentColor }}
                  >
                    {user.avatar || 'AI'}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/"
                  className="px-3.5 py-1.5 rounded-lg bg-[#0F2C59] hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  Portal Sign-In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Menu Bar */}
        <div className="bg-[#0F2C59] dark:bg-[#1E293B] text-white transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto">
            <nav className="flex items-center space-x-1 py-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold whitespace-nowrap rounded-md transition-colors ${
                      active
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-blue-100 hover:bg-blue-800/60 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-blue-200" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium text-blue-200 pr-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Socket Connected</span>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around shadow-lg">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isLinkActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                active
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
    </>
  );
}
