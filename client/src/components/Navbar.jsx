'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  Users,
  Calendar,
  FileText,
  Pill,
  BarChart3,
  Settings,
  Bell,
  Sun,
  Moon,
  Search,
  CheckSquare,
  HeartPulse,
  LogOut,
  Home,
  MessageSquare,
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

  useEffect(() => {
    const handleCmdOpen = () => setIsCmdOpen(true);
    window.addEventListener('open-command-palette', handleCmdOpen);
    return () => window.removeEventListener('open-command-palette', handleCmdOpen);
  }, []);

  // Determine Role Accent
  const roleAccentColor =
    role === 'DOCTOR'
      ? '#2563EB'
      : role === 'ADMIN'
      ? '#9333EA'
      : role === 'RECEPTIONIST'
      ? '#0D9488'
      : role === 'PHARMACIST'
      ? '#F59E0B'
      : '#2563EB';

  const unreadNotifs = notifications.filter((n) => n.unread).length;

  // Center nav links filtering based on role
  const getNavLinks = () => {
    if (role === 'DOCTOR') {
      return [
        { label: 'Dashboard', href: '/doctor', icon: Activity },
        { label: 'Patients', href: '/doctor/patients', icon: Users },
        { label: 'Queue', href: '/doctor/queue', icon: Calendar },
        { label: 'Prescriptions', href: '/doctor/prescriptions/new', icon: FileText },
      ];
    }
    if (role === 'ADMIN') {
      return [
        { label: 'Dashboard', href: '/admin', icon: Activity },
        { label: 'Patients', href: '/doctor/patients', icon: Users },
        { label: 'Staff Management', href: '/admin#staff', icon: Users },
        { label: 'Reports', href: '/admin#reports', icon: BarChart3 },
      ];
    }
    if (role === 'RECEPTIONIST') {
      return [
        { label: 'Dashboard', href: '/receptionist', icon: Activity },
        { label: 'Patients', href: '/doctor/patients', icon: Users },
        { label: 'Appointments', href: '/receptionist#appointments', icon: Calendar },
        { label: 'Check-in', href: '/receptionist#checkin', icon: CheckSquare },
      ];
    }
    if (role === 'PHARMACIST') {
      return [
        { label: 'Dashboard', href: '/pharmacist', icon: Activity },
        { label: 'Prescriptions', href: '/pharmacist#prescriptions', icon: FileText },
        { label: 'Inventory', href: '/pharmacist#inventory', icon: Pill },
      ];
    }
    if (role === 'PATIENT') {
      return [
        { label: 'Home', href: '/patient', icon: Home },
        { label: 'Feedback', href: '/patient/feedback', icon: MessageSquare },
      ];
    }
    return [{ label: 'Sign In', href: '/', icon: Activity }];
  };

  const navLinks = getNavLinks();

  const isLinkActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo Mark & Name */}
          <div className="flex items-center gap-3">
            <Link href={role === 'PATIENT' ? '/patient' : role === 'DOCTOR' ? '/doctor' : role === 'ADMIN' ? '/admin' : role === 'RECEPTIONIST' ? '/receptionist' : role === 'PHARMACIST' ? '/pharmacist' : '/'} className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white leading-none">
                  EASPATAAL
                </span>
                <span className="text-[9px] font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase mt-0.5">
                  MEDICORE SYSTEM
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Command Palette, Theme, Notifications, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Command Palette Button */}
            <button
              onClick={() => setIsCmdOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded font-mono shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
                )}
              </button>
              <NotificationsDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
            </div>

            <div className="h-6 w-[1px] bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block" />

            {/* User Profile Block */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {user.role}
                  </span>
                </div>

                {/* Avatar with Role-accent Ring */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ring-2 ring-offset-2 dark:ring-offset-gray-900"
                  style={{ backgroundColor: roleAccentColor, ringColor: roleAccentColor }}
                >
                  {user.avatar || 'US'}
                </div>

                <button
                  onClick={() => {
                    logout();
                    router.push('/');
                  }}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/"
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-2 py-2 flex items-center justify-around">
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

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
    </>
  );
}
