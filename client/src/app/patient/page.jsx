'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Bell,
  MessageSquare,
  Sparkles,
  QrCode,
  ShieldCheck,
  PhoneCall,
  CheckCircle2,
  Heart,
  ChevronRight,
  Info,
  Tv,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { showToast } from '../../components/Toast';
import QRCodeGenerator from '../../components/QRCodeGenerator';

export default function PatientPortal() {
  const { queue } = useHospitalStore();

  const [smsOptIn, setSmsOptIn] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 234-5678');
  const [countdownMins, setCountdownMins] = useState(14);
  const [countdownSecs, setCountdownSecs] = useState(30);

  // Active assigned patient token (e.g. CARD-042 / Sophia Martinez)
  const activeToken = queue[0] || {
    tokenCode: 'CARD-042',
    tokenNumber: 101,
    patientName: 'Sophia Martinez',
    reason: 'Migraine & Nausea Evaluation',
    doctorName: 'Dr. John Smith',
    department: 'Cardiology',
    roomNo: 'OPD Room 104',
    position: 3,
    totalAhead: 2,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSecs((prev) => {
        if (prev === 0) {
          if (countdownMins === 0) return 0;
          setCountdownMins((m) => m - 1);
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownMins]);

  const handleToggleSms = () => {
    const nextState = !smsOptIn;
    setSmsOptIn(nextState);
    if (nextState) {
      showToast(`Twilio SMS Alerts enabled for ${phoneNumber}. You will receive a text when 2 patients away!`, 'success');
    } else {
      showToast('SMS Alerts disabled', 'info');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Patient Live Token Tracker</h1>
        <p className="text-xs text-[#00D4FF] font-medium">
          Real-Time Airport Board Token Status & Automated Twilio SMS Alerts
        </p>
      </div>

      {/* HUGE AIRPORT DEPARTURE BOARD TOKEN CARD */}
      <div className="glass-card p-8 sm:p-10 border-2 border-[#00D4FF]/40 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-extrabold uppercase tracking-widest border border-[#00D4FF]/30">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] animate-ping" />
          <span>CURRENTLY WAITING IN QUEUE</span>
        </div>

        {/* Huge Token Code Display */}
        <div className="py-4">
          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Your Issued Token Code</div>
          <div className="text-5xl sm:text-7xl font-black text-white font-mono tracking-widest token-led drop-shadow-lg">
            {activeToken.tokenCode || `CARD-042`}
          </div>
        </div>

        {/* Estimated Wait Time & Countdown Clock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-4 border-t border-white/10">
          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 flex flex-col items-center">
            <Clock className="w-6 h-6 text-[#00D4FF] mb-1 animate-pulse" />
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Estimated Wait Time</div>
            <div className="text-2xl font-black text-white font-mono mt-1">
              {String(countdownMins).padStart(2, '0')}:{String(countdownSecs).padStart(2, '0')}
            </div>
          </div>

          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 flex flex-col items-center">
            <span className="text-2xl font-black text-[#10B981] font-mono mb-1">{activeToken.totalAhead || 2}</span>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider font-bold">Patients Ahead of You</div>
            <div className="text-xs text-gray-300 font-semibold mt-1">Room 104 • Dr. Smith</div>
          </div>
        </div>

        {/* Step Progress Bar Visualization */}
        <div className="pt-6 border-t border-white/10 max-w-xl mx-auto space-y-3">
          <div className="flex justify-between text-xs text-gray-400 font-bold">
            <span>Checked In</span>
            <span className="text-[#00D4FF]">In Queue (Position 3)</span>
            <span>Next Up</span>
            <span>Consultation</span>
          </div>

          <div className="w-full bg-white/10 h-3 rounded-full relative overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#0A2463] to-[#00D4FF] rounded-full" style={{ width: '65%' }} />
          </div>
        </div>

        {/* QR Code Section for Status Scan */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <QRCodeGenerator value={`https://nexline.hospital/patient?token=${activeToken.tokenCode || 'CARD-042'}`} size={110} />
          <div className="text-left space-y-1 max-w-xs">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-[#00D4FF]" />
              <span>Token Digital Verification QR</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Scan this QR code on your mobile phone to take this live departure tracker with you anywhere in the hospital.
            </p>
          </div>
        </div>
      </div>

      {/* SMS Notification Opt-in Card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#10B981]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Twilio SMS Notification Alert</h3>
            <p className="text-xs text-gray-400">
              Get an instant text alert when you are 2 tokens away from your turn ({phoneNumber})
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleSms}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            smsOptIn
              ? 'bg-[#10B981] text-white shadow-emerald-glow'
              : 'bg-white/10 text-gray-400 border border-white/10'
          }`}
        >
          {smsOptIn ? 'SMS Alerts Enabled ✓' : 'Enable SMS Alerts'}
        </button>
      </div>

      {/* While You Wait Announcements & Health Tips Carousel */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#00D4FF]" />
          <h3 className="text-base font-bold text-white">While You Wait — Health & Hospital Guidance</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-bold text-[#00D4FF] flex items-center gap-1.5">
              <Info className="w-4 h-4" /> Free Wi-Fi Access
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Connect to <span className="font-mono text-white font-bold">Nexline_Guest_WiFi</span>. Password: <span className="font-mono text-white font-bold">health2026</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
              <Heart className="w-4 h-4" /> Hydration & Care
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Complimentary water stations are located right beside Consultation Room 104 and Emergency Admissions.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
