'use client';

import React, { useState } from 'react';
import {
  UserPlus,
  Users,
  AlertTriangle,
  Flame,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { showToast } from '../../components/Toast';
import ConfirmModal from '../../components/ConfirmModal';

export default function ReceptionistDashboard() {
  const { queue, addQueueToken, addPatient } = useHospitalStore();

  const [selectedDept, setSelectedDept] = useState('ALL');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [reason, setReason] = useState('');
  const [dept, setDept] = useState('Cardiology');
  const [tokenType, setTokenType] = useState('WALK_IN');

  const [bumpTarget, setBumpTarget] = useState(null);
  const [isBumpModalOpen, setIsBumpModalOpen] = useState(false);

  const departments = ['ALL', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency'];

  const filteredQueue = queue.filter((item) => {
    if (selectedDept === 'ALL') return true;
    return item.department === selectedDept || (selectedDept === 'Emergency' && item.reason?.toLowerCase().includes('emergency'));
  });

  const handleRegisterToken = (e) => {
    e.preventDefault();
    if (!patientName.trim()) {
      showToast('Patient name is required', 'warning');
      return;
    }

    const deptPrefixes = {
      Cardiology: 'CARD',
      Neurology: 'NEUR',
      Orthopedics: 'ORTH',
      Pediatrics: 'PEDI',
      Emergency: 'EMG',
    };

    const prefix = deptPrefixes[dept] || 'OPD';
    const num = 100 + queue.length + 1;
    const tokenCode = `${prefix}-${num}`;

    // Add new patient & token
    const newPatient = addPatient({
      name: patientName,
      age: age || 30,
      gender,
      condition: reason || 'General Intake',
    });

    addQueueToken({
      patientId: newPatient.id,
      patientName,
      age: parseInt(age) || 30,
      gender,
      reason: reason || 'General Intake',
      doctorName: 'Dr. John Smith',
      tokenCode,
      department: dept,
    });

    showToast(`Token ${tokenCode} issued for ${patientName}`, 'success');
    setPatientName('');
    setAge('');
    setReason('');
  };

  const triggerEmergencyBump = (item) => {
    setBumpTarget(item);
    setIsBumpModalOpen(true);
  };

  const confirmEmergencyBump = () => {
    if (bumpTarget) {
      showToast(`EMERGENCY BUMPED: Token ${bumpTarget.tokenCode || bumpTarget.tokenNumber} moved to TOP of queue`, 'success');
      setBumpTarget(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#10B981]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Reception & Front Desk Portal</h1>
            <p className="text-xs text-[#10B981] font-semibold">Fast Intake Token Generation & Emergency Priority Escalation</p>
          </div>
        </div>
      </div>

      {/* Grid: Left Column Quick Registration, Right Column Queue Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Patient Registration Form */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#00D4FF]" />
            <h2 className="text-lg font-bold text-white">Issue Queue Token</h2>
          </div>

          <form onSubmit={handleRegisterToken} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                Target Department
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                Token Type
              </label>
              <select
                value={tokenType}
                onChange={(e) => setTokenType(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              >
                <option value="WALK_IN">Walk-In Patient</option>
                <option value="APPOINTMENT">Scheduled Appointment</option>
                <option value="ELDERLY">Elderly / Pediatric Priority</option>
                <option value="EMERGENCY">Emergency Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">
                Reason / Chief Complaint
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Chest pain, Fever, Routine Checkup"
                className="w-full px-3.5 py-2 rounded-xl glass-input text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#0A2463] hover:bg-[#00D4FF] hover:text-[#070F2B] text-white font-bold text-sm shadow-cyan-glow border border-[#00D4FF]/40 transition-all flex items-center justify-center gap-2 pt-3"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Token & Print Ticket</span>
            </button>
          </form>
        </div>

        {/* Queue Overview Table with Department Filter & Emergency Bump */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00D4FF]" />
              <h2 className="text-lg font-bold text-white">Live Department Queue Overview</h2>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDept(d)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedDept === d
                      ? 'bg-[#00D4FF] text-[#070F2B]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Queue Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Token Code</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Emergency Escalation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQueue.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No active tokens found for this filter.
                    </td>
                  </tr>
                ) : (
                  filteredQueue.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#00D4FF]">
                        {item.tokenCode || `CARD-${item.tokenNumber}`}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {item.patientName}
                      </td>
                      <td className="py-3.5 px-4 text-gray-300">
                        {item.reason}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            item.status === 'In Progress'
                              ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30'
                              : item.status === 'Completed'
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : 'bg-white/10 text-gray-300'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {item.status === 'Waiting' && (
                          <button
                            onClick={() => triggerEmergencyBump(item)}
                            className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-bold transition-all shadow-crimson-glow inline-flex items-center gap-1.5"
                          >
                            <Flame className="w-3.5 h-3.5 fill-current" />
                            <span>Emergency Bump</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Confirmation Modal for Emergency Bump */}
      <ConfirmModal
        isOpen={isBumpModalOpen}
        onClose={() => setIsBumpModalOpen(false)}
        onConfirm={confirmEmergencyBump}
        title="Escalate Patient to Emergency Top Priority?"
        message={`Are you sure you want to bump ${bumpTarget?.patientName} (${bumpTarget?.tokenCode || bumpTarget?.tokenNumber}) directly to the TOP of the queue?`}
        confirmText="Yes, Emergency Bump"
        isDanger={true}
      />
    </div>
  );
}
