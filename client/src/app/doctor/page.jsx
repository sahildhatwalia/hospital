'use client';

import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  Check,
  RotateCcw,
  User,
  Heart,
  Activity,
  Flame,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

export default function DoctorDashboard() {
  const { queue, callNextQueue, completeQueueItem } = useHospitalStore();

  const [doctorStatus, setDoctorStatus] = useState('AVAILABLE'); // AVAILABLE, ON_BREAK, IN_CONSULTATION
  const [consultationTimer, setConsultationTimer] = useState(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Active current patient (In Progress)
  const currentPatient = queue.find((item) => item.status === 'In Progress');
  // Next upcoming patients (Waiting)
  const upcomingQueue = queue.filter((item) => item.status === 'Waiting');
  const completedToday = queue.filter((item) => item.status === 'Completed').length;

  useEffect(() => {
    let interval = null;
    if (currentPatient) {
      interval = setInterval(() => {
        setConsultationTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setConsultationTimer(0);
    }
    return () => clearInterval(interval);
  }, [currentPatient]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCallNext = () => {
    if (upcomingQueue.length === 0) {
      showToast('No patients currently waiting in queue', 'warning');
      return;
    }
    const nextItem = upcomingQueue[0];
    callNextQueue(nextItem.id);
    setDoctorStatus('IN_CONSULTATION');
    showToast(`Calling Token ${nextItem.tokenCode || nextItem.tokenNumber} — ${nextItem.patientName}`, 'success');
  };

  const handleCompleteCurrent = () => {
    if (currentPatient) {
      completeQueueItem(currentPatient.id);
      setDoctorStatus('AVAILABLE');
      showToast(`Completed consultation for ${currentPatient.patientName}`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-[#00D4FF]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30 flex items-center justify-center">
            <Stethoscope className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Dr. John Smith</h1>
            <p className="text-xs text-[#00D4FF] font-semibold">Cardiology Department • Consultation Room 104</p>
          </div>
        </div>

        {/* Doctor Status Switcher */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => {
              setDoctorStatus('AVAILABLE');
              showToast('Doctor status set to Available', 'info');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              doctorStatus === 'AVAILABLE'
                ? 'bg-[#10B981] text-white shadow-emerald-glow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Available
          </button>

          <button
            onClick={() => {
              setDoctorStatus('ON_BREAK');
              showToast('Doctor status set to On Break', 'warning');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              doctorStatus === 'ON_BREAK'
                ? 'bg-amber-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            On Break
          </button>

          <button
            onClick={() => {
              setDoctorStatus('IN_CONSULTATION');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              doctorStatus === 'IN_CONSULTATION'
                ? 'bg-[#00D4FF] text-[#070F2B] font-extrabold shadow-cyan-glow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            In Consultation
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Prominent Current Patient Banner */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Prominent Current Patient Card */}
          <div className="glass-card p-6 sm:p-8 relative overflow-hidden border-2 border-[#00D4FF]/40 shadow-2xl">
            <div className="absolute top-0 right-0 px-6 py-2 bg-[#00D4FF] text-[#070F2B] font-extrabold text-xs uppercase tracking-widest rounded-bl-2xl">
              NOW SERVING
            </div>

            {currentPatient ? (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="px-5 py-3 rounded-2xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] font-mono font-black text-2xl tracking-wider token-led">
                      {currentPatient.tokenCode || `CARD-${currentPatient.tokenNumber}`}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentPatient.patientName}</h2>
                      <p className="text-xs text-gray-400">
                        {currentPatient.age} yrs • {currentPatient.gender} • Intake: {currentPatient.arrivalTime}
                      </p>
                    </div>
                  </div>

                  {/* Consultation Live Timer */}
                  <div className="flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-2xl border border-white/10">
                    <Clock className="w-5 h-5 text-[#00D4FF] animate-pulse" />
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Consultation Time</div>
                      <div className="text-lg font-mono font-bold text-white">{formatTimer(consultationTimer)}</div>
                    </div>
                  </div>
                </div>

                {/* Patient Vitals & Reason Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <div className="text-[11px] text-gray-400">Chief Complaint</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{currentPatient.reason}</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <div className="text-[11px] text-gray-400">Blood Pressure</div>
                    <div className="text-sm font-semibold text-[#00D4FF] mt-0.5">120 / 80 mmHg</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <div className="text-[11px] text-gray-400">Pulse / Heart Rate</div>
                    <div className="text-sm font-semibold text-[#10B981] mt-0.5">72 bpm (Stable)</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleCompleteCurrent}
                    className="flex-1 py-4 px-6 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-sm shadow-emerald-glow transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Complete Consultation</span>
                  </button>

                  <button
                    onClick={handleCallNext}
                    className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Next Patient</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
                  <User className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">No Active Consultation</h3>
                  <p className="text-xs text-gray-400">Click below to call the next waiting patient in queue</p>
                </div>

                {/* Prominent CALL NEXT PATIENT Button */}
                <button
                  onClick={handleCallNext}
                  className="py-5 px-10 rounded-2xl bg-[#0A2463] hover:bg-[#00D4FF] hover:text-[#070F2B] text-white font-black text-lg shadow-cyan-glow border border-[#00D4FF]/40 transition-all inline-flex items-center gap-3 transform hover:scale-105"
                >
                  <Play className="w-6 h-6 fill-current" />
                  <span>CALL NEXT PATIENT</span>
                </button>
              </div>
            )}
          </div>

          {/* Next 5 Waiting Patients List */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00D4FF]" />
                <h3 className="text-lg font-bold text-white">Upcoming Patients Queue ({upcomingQueue.length})</h3>
              </div>
              <span className="text-xs text-gray-400">Sorted by Priority Scoring</span>
            </div>

            {upcomingQueue.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-xs">No patients waiting in queue.</div>
            ) : (
              <div className="space-y-3">
                {upcomingQueue.slice(0, 5).map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] font-bold text-xs flex items-center justify-center font-mono">
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{item.patientName}</span>
                          <span className="text-xs px-2 py-0.5 rounded-md bg-[#00D4FF]/20 text-[#00D4FF] font-mono font-bold">
                            {item.tokenCode || `CARD-${item.tokenNumber}`}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{item.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs font-semibold text-gray-300">{item.waitTime}</div>
                        <div className="text-[10px] text-gray-500">Wait Duration</div>
                      </div>
                      <button
                        onClick={() => {
                          callNextQueue(item.id);
                          setDoctorStatus('IN_CONSULTATION');
                          showToast(`Calling ${item.patientName}`, 'success');
                        }}
                        className="p-2 rounded-xl bg-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#070F2B] transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Today's Metrics & Circular Gauge */}
        <div className="space-y-6">
          
          {/* Today's Completed Progress Ring */}
          <div className="glass-card p-6 space-y-6 text-center">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Today's Performance Target</h3>
            
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00D4FF]"
                  strokeDasharray={`${Math.min(100, (completedToday / 20) * 100)}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-white font-mono">{completedToday}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Completed</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between text-xs">
              <span className="text-gray-400">Target: 20 Patients</span>
              <span className="text-[#00D4FF] font-bold">{Math.round((completedToday / 20) * 100)}% Reached</span>
            </div>
          </div>

          {/* Quick Doctor Tools */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Quick Consultation Tools</h3>
            
            <a
              href="/doctor/prescriptions/new"
              className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-[#00D4FF]/20 border border-white/10 flex items-center justify-between text-xs font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                <span>Create Digital Prescription</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>

            <a
              href="/doctor/patients"
              className="w-full p-3.5 rounded-xl bg-white/5 hover:bg-[#00D4FF]/20 border border-white/10 flex items-center justify-between text-xs font-bold text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#10B981]" />
                <span>Patient Medical History Lookup</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
