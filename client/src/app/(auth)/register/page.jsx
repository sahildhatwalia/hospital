'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../../lib/api';
import { useAuthStore } from '../../../store/useAuthStore';
import { UserPlus, User, Mail, Lock, Phone } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'PATIENT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', form);
      const { user, token } = res.data.data;
      setAuth(user, token);

      if (user.role === 'PATIENT') router.push('/patient');
      else if (user.role === 'DOCTOR') router.push('/doctor');
      else if (user.role === 'RECEPTIONIST') router.push('/receptionist');
      else if (user.role === 'ADMIN') router.push('/admin');
      else router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="glass-panel p-8 rounded-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-teal-500/20 text-teal-400 mb-2">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-sm text-slate-400">Join CareQueue for live hospital access</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
            <div className="relative">
              <User className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white outline-none focus:border-sky-400 text-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white outline-none focus:border-sky-400 text-sm"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white outline-none focus:border-sky-400 text-sm"
                placeholder="+1 555-0192"
              />
            </div>
          </div>

          <div>
            <input type="hidden" value="PATIENT" />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-white/20 rounded-xl text-white outline-none focus:border-sky-400 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg hover:brightness-110 transition disabled:opacity-50 text-sm"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-teal-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
