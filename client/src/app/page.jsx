'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartPulse, ArrowRight, ShieldCheck, UserCheck, Key, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { showToast } from '../components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { switchRole } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState('DOCTOR');
  const [username, setUsername] = useState('dr.smith@easpataal.com');
  const [password, setPassword] = useState('password123');
  const [showDemoBox, setShowDemoBox] = useState(false);

  const demoRoles = [
    { roleKey: 'DOCTOR', name: 'Dr. John Smith', user: 'dr.smith@easpataal.com', pass: 'doctor123', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
    { roleKey: 'ADMIN', name: 'Sarah Jenkins', user: 'admin.sarah@easpataal.com', pass: 'admin123', badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
    { roleKey: 'RECEPTIONIST', name: 'Michael Chang', user: 'frontdesk.m@easpataal.com', pass: 'reception123', badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300' },
    { roleKey: 'PHARMACIST', name: 'Priya Sharma', user: 'pharmacy.priya@easpataal.com', pass: 'pharmacy123', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
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
    showToast(`Logged in successfully as ${selectedRole}`, 'success');

    // Route based on role
    if (selectedRole === 'DOCTOR') router.push('/doctor');
    else if (selectedRole === 'ADMIN') router.push('/admin');
    else if (selectedRole === 'RECEPTIONIST') router.push('/receptionist');
    else if (selectedRole === 'PHARMACIST') router.push('/pharmacist');
    else router.push('/patient');
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-6 px-4">
      {/* Patient Portal Quick Banner */}
      <div className="mb-6">
        <Link
          href="/patient"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-all shadow-2xs"
        >
          <span>Need to book an appointment or view records?</span>
          <span className="font-bold underline flex items-center gap-1">
            Go to Patient Portal <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-2xl shadow-xl p-6 sm:p-8">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 p-0.5 shadow-md mb-3">
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[14px] flex items-center justify-center">
              <HeartPulse className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            EASPATAAL
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to access the hospital management system
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Role Dropdown Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Select Portal Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="DOCTOR">Doctor Portal</option>
                <option value="ADMIN">Admin Portal</option>
                <option value="RECEPTIONIST">Receptionist Portal</option>
                <option value="PHARMACIST">Pharmacist Portal</option>
              </select>
            </div>
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. dr.smith@easpataal.com"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Demo Credentials Button */}
          <div>
            <button
              type="button"
              onClick={() => setShowDemoBox(!showDemoBox)}
              className="w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{showDemoBox ? 'Hide Demo Credentials' : 'Use Demo Credentials'}</span>
            </button>
          </div>

          {/* Demo Credentials Expandable Box */}
          {showDemoBox && (
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-2 animate-in fade-in duration-200">
              <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Click any role to auto-fill:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {demoRoles.map((demo) => (
                  <button
                    key={demo.roleKey}
                    type="button"
                    onClick={() => handleAutofill(demo)}
                    className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${demo.badgeColor}`}>
                        {demo.roleKey}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mt-1 truncate">
                      {demo.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to {selectedRole} Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Tag */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span>Encrypted HIPAA-compliant staff session</span>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="mt-8 text-center text-xs text-gray-400">
        © 2026 EASPATAAL MediCore Systems. All rights reserved.
      </footer>
    </div>
  );
}
