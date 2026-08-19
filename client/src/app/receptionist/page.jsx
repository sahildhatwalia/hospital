'use client';

import React, { useState } from 'react';
import {
  Calendar,
  CheckSquare,
  UserCheck,
  UserX,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  X,
  UserPlus,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { showToast } from '../../components/Toast';

export default function ReceptionistDashboard() {
  const { queue, addQueueToken, patients, staff } = useHospitalStore();
  const { user } = useAuthStore();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    age: '28',
    gender: 'Female',
    doctorName: 'Dr. John Smith',
    reason: 'Routine Consultation',
    appointmentDate: '2026-08-19',
    slotTime: '10:30 AM',
  });

  const doctorsList = staff.filter((s) => s.role === 'Doctor');

  // Stats
  const todayAppointments = queue.length + 8;
  const checkedInCount = queue.filter((q) => q.status === 'In Progress' || q.status === 'Completed').length + 5;
  const walkInsCount = 6;
  const noShowsCount = 2;

  const filteredQueue = queue.filter(
    (q) =>
      q.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!bookingForm.patientName) {
      showToast('Please enter patient name.', 'warning');
      return;
    }

    const token = addQueueToken({
      patientName: bookingForm.patientName,
      age: parseInt(bookingForm.age) || 30,
      gender: bookingForm.gender,
      reason: bookingForm.reason,
      doctorName: bookingForm.doctorName,
    });

    showToast(`Appointment booked! Created queue token ${token.id} for ${token.patientName}.`, 'success');
    setIsBookingOpen(false);
    setBookingForm({
      patientName: '',
      age: '28',
      gender: 'Female',
      doctorName: 'Dr. John Smith',
      reason: 'Routine Consultation',
      appointmentDate: '2026-08-19',
      slotTime: '10:30 AM',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Front Desk & Reception
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Patient admissions, appointment scheduling, and live desk check-in queue
          </p>
        </div>

        <button
          onClick={() => setIsBookingOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Stat Cards Row (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Appointments */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Today's Appointments</span>
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{todayAppointments}</div>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">
              Scheduled for today
            </p>
          </div>
        </div>

        {/* Card 2: Checked-in */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Checked-in</span>
            <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{checkedInCount}</div>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
              At doctor desks
            </p>
          </div>
        </div>

        {/* Card 3: Walk-ins */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Walk-ins</span>
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{walkInsCount}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
              Unscheduled visits
            </p>
          </div>
        </div>

        {/* Card 4: No-shows */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">No-shows</span>
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <UserX className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{noShowsCount}</div>
            <p className="text-xs text-red-500 font-medium mt-1">
              Missed appointment window
            </p>
          </div>
        </div>
      </div>

      {/* Live Check-in Queue Table */}
      <div id="checkin" className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Check-in Queue</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Patients waiting in reception lobby</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search token or patient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50/70 dark:bg-gray-800/40 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3.5">Token ID</th>
                <th className="px-6 py-3.5">Patient Info</th>
                <th className="px-6 py-3.5">Arrival Time</th>
                <th className="px-6 py-3.5">Assigned Doctor</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-teal-50/20 dark:hover:bg-teal-950/10 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-teal-600 dark:text-teal-400">
                    {item.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{item.patientName}</div>
                    <div className="text-xs text-gray-400">{item.reason}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300">
                    {item.arrivalTime} ({item.waitTime} ago)
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900 dark:text-gray-100">
                    {item.doctorName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        item.status === 'Waiting'
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                          : item.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status === 'Waiting' ? (
                      <button
                        onClick={() => {
                          showToast(`Checked in ${item.patientName} for consultation.`, 'success');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors shadow-2xs"
                      >
                        Confirm Check-In
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Checked In</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Book Doctor Appointment</h3>
              </div>
              <button onClick={() => setIsBookingOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Vance"
                  value={bookingForm.patientName}
                  onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Age & Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bookingForm.age}
                      onChange={(e) => setBookingForm({ ...bookingForm, age: e.target.value })}
                      className="w-1/2 px-2.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    />
                    <select
                      value={bookingForm.gender}
                      onChange={(e) => setBookingForm({ ...bookingForm, gender: e.target.value })}
                      className="w-1/2 px-2.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Select Doctor *
                  </label>
                  <select
                    value={bookingForm.doctorName}
                    onChange={(e) => setBookingForm({ ...bookingForm, doctorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                  >
                    <option value="Dr. John Smith">Dr. John Smith (Cardiology)</option>
                    <option value="Dr. Amanda Chen">Dr. Amanda Chen (Neurology)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Reason for Visit *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hypertension Followup"
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={bookingForm.appointmentDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, appointmentDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Time Slot
                  </label>
                  <select
                    value={bookingForm.slotTime}
                    onChange={(e) => setBookingForm({ ...bookingForm, slotTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:45 AM">11:45 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
