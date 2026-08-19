'use client';

import React, { useState } from 'react';
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  UserPlus,
  BarChart3,
  X,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useHospitalStore } from '../../store/useHospitalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { WEEKLY_PATIENT_DATA, DEPARTMENT_STATS } from '../../lib/mockData';
import { showToast } from '../../components/Toast';

export default function AdminDashboard() {
  const { staff, addStaff, patients } = useHospitalStore();
  const { user } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    role: 'Doctor',
    department: 'Cardiology',
    email: '',
    phone: '',
    shifts: 'Morning (8 AM - 4 PM)',
  });

  const totalStaffCount = staff.length;
  const activeStaffCount = staff.filter((s) => s.status === 'Active').length;
  const totalPatientsToday = patients.length + 42;
  const monthlyRevenue = '$148,650';

  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.email) {
      showToast('Please enter staff name and valid email address.', 'warning');
      return;
    }
    const created = addStaff(newStaffForm);
    showToast(`Staff member ${created.name} added to ${created.department}!`, 'success');
    setIsAddStaffOpen(false);
    setNewStaffForm({
      name: '',
      role: 'Doctor',
      department: 'Cardiology',
      email: '',
      phone: '',
      shifts: 'Morning (8 AM - 4 PM)',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Hospital Admin Portal
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            System metrics, financial overview, and staff allocation management
          </p>
        </div>

        <button
          onClick={() => setIsAddStaffOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Staff */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Staff</span>
            <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalStaffCount}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-1">
              {activeStaffCount} currently active
            </p>
          </div>
        </div>

        {/* Card 2: Patients Today */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Patients Today</span>
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{totalPatientsToday}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
              +14% vs last week
            </p>
          </div>
        </div>

        {/* Card 3: Monthly Revenue */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Revenue</span>
            <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{monthlyRevenue}</div>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
              On track for Q3 target
            </p>
          </div>
        </div>

        {/* Card 4: Active Departments */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Departments</span>
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">8 Units</div>
            <p className="text-xs text-gray-400 mt-1">Full operational capacity</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section (Recharts) */}
      <div id="reports" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Inflow Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Weekly Patient Inflow Trends</h2>
              <p className="text-xs text-gray-400">Inpatients, Outpatients & Emergency admissions</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-bold">
              Live Recharts
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_PATIENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1D23',
                    borderColor: '#2D3748',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="Outpatients" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Inpatients" fill="#9333EA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Emergency" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution Pie Chart */}
        <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Department Volume</h2>
            <p className="text-xs text-gray-400">Patient distribution across specialties</p>
          </div>

          <div className="h-64 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEPARTMENT_STATS}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {DEPARTMENT_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1D23',
                    borderColor: '#2D3748',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Staff Management Panel */}
      <div id="staff" className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hospital Staff Directory</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage doctors, receptionists, pharmacists, and admins</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search staff name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50/70 dark:bg-gray-800/40 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3.5">Staff Member</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Assigned Shift</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredStaff.map((person) => {
                const isDoctor = person.role === 'Doctor';
                const isAdmin = person.role === 'Admin';
                const isReceptionist = person.role === 'Receptionist';
                const isPharmacist = person.role === 'Pharmacist';

                return (
                  <tr key={person.id} className="hover:bg-purple-50/20 dark:hover:bg-purple-950/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{person.name}</div>
                      <div className="text-xs text-gray-400">{person.email} • {person.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isDoctor
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            : isAdmin
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                            : isReceptionist
                            ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}
                      >
                        {person.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                      {person.department}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                      {person.shifts}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          person.status === 'Active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {person.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Add Hospital Staff Member</h3>
              </div>
              <button onClick={() => setIsAddStaffOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaffSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Amanda Chen"
                  value={newStaffForm.name}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Role Category *
                  </label>
                  <select
                    value={newStaffForm.role}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Admin">Admin</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Pharmacist">Pharmacist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiology"
                    value={newStaffForm.department}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="staff@easpataal.com"
                    value={newStaffForm.email}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                    Assigned Shift
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Morning (8 AM - 4 PM)"
                    value={newStaffForm.shifts}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, shifts: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddStaffOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-sm"
                >
                  Register Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
