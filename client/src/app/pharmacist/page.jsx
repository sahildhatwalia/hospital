'use client';

import React, { useState } from 'react';
import {
  Pill,
  FileText,
  AlertTriangle,
  CheckCircle2,
  PackageX,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from 'lucide-react';
import { useHospitalStore } from '../../store/useHospitalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { showToast } from '../../components/Toast';

export default function PharmacistDashboard() {
  const { prescriptions, inventory, dispensePrescription, updateStock } = useHospitalStore();
  const { user } = useAuthStore();

  const [rxSearchQuery, setRxSearchQuery] = useState('');
  const [invSearchQuery, setInvSearchQuery] = useState('');
  const [expandedRxId, setExpandedRxId] = useState(null);

  // Stats
  const pendingRx = prescriptions.filter((p) => p.status === 'Pending');
  const dispensedTodayCount = prescriptions.filter((p) => p.status === 'Dispensed').length;
  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock').length;
  const outOfStockCount = inventory.filter((i) => i.status === 'Out of Stock').length;

  const filteredRx = prescriptions.filter(
    (p) =>
      p.patientName.toLowerCase().includes(rxSearchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(rxSearchQuery.toLowerCase()) ||
      p.doctorName.toLowerCase().includes(rxSearchQuery.toLowerCase())
  );

  const filteredInventory = inventory.filter(
    (i) =>
      i.drugName.toLowerCase().includes(invSearchQuery.toLowerCase()) ||
      i.category.toLowerCase().includes(invSearchQuery.toLowerCase())
  );

  const handleDispense = (rxId, patientName) => {
    dispensePrescription(rxId);
    showToast(`Prescription ${rxId} for ${patientName} marked as Dispensed!`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Central Pharmacy Operations
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Prescription fulfillment, medication dispensing, and real-time inventory management
          </p>
        </div>
      </div>

      {/* Stat Cards Row (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Pending Prescriptions */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pending Prescriptions</span>
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{pendingRx.length}</div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
              Awaiting fulfillment
            </p>
          </div>
        </div>

        {/* Card 2: Dispensed Today */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dispensed Today</span>
            <div className="p-2.5 rounded-lg bg-green-50 dark:bg-green-950/60 text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{dispensedTodayCount}</div>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
              Handed to patients
            </p>
          </div>
        </div>

        {/* Card 3: Low Stock Items */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Low Stock Items</span>
            <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{lowStockCount}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
              Below threshold
            </p>
          </div>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] shadow-card card-hover-lift flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Out of Stock</span>
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <PackageX className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{outOfStockCount}</div>
            <p className="text-xs text-red-500 font-medium mt-1">
              Urgent reorder needed
            </p>
          </div>
        </div>
      </div>

      {/* Prescription Queue Section */}
      <div id="prescriptions" className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Doctor Prescription Orders</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Orders sent directly from consultation rooms</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Rx ID or patient..."
              value={rxSearchQuery}
              onChange={(e) => setRxSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filteredRx.map((rx) => {
            const isPending = rx.status === 'Pending';
            const isExpanded = expandedRxId === rx.id;

            return (
              <div key={rx.id} className="p-5 hover:bg-amber-50/20 dark:hover:bg-amber-950/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      {rx.id}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{rx.patientName}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Prescribed by <strong className="text-gray-700 dark:text-gray-300">{rx.doctorName}</strong> • {rx.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        isPending
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300'
                          : 'bg-green-100 text-green-700 dark:bg-green-950/70 dark:text-green-300'
                      }`}
                    >
                      {rx.status}
                    </span>

                    {isPending ? (
                      <button
                        onClick={() => handleDispense(rx.id, rx.patientName)}
                        className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark as Dispensed</span>
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Dispensed</span>
                    )}

                    <button
                      onClick={() => setExpandedRxId(isExpanded ? null : rx.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Medicines Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Prescribed Medicines List:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {rx.medicines.map((m, idx) => (
                        <div key={idx} className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs">
                          <span className="font-bold text-gray-900 dark:text-white block">{m.name} ({m.dosage})</span>
                          <span className="text-gray-500 dark:text-gray-400 block mt-0.5">Schedule: {m.frequency} • {m.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory & Stock Levels Table */}
      <div id="inventory" className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl shadow-card overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Medicine Stock Inventory</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Stock levels and reorder thresholds</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search drug name or category..."
              value={invSearchQuery}
              onChange={(e) => setInvSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-50/70 dark:bg-gray-800/40 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-3.5">Drug Name</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Stock Progress</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredInventory.map((item) => {
                const isLow = item.status === 'Low Stock';
                const isOut = item.status === 'Out of Stock';

                const pct = Math.min(100, Math.round((item.stock / (item.minLevel * 3)) * 100));

                return (
                  <tr key={item.id} className="hover:bg-amber-50/10 dark:hover:bg-amber-950/10 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      {item.drugName}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 w-64">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span>{item.stock} {item.unit}</span>
                        <span className="text-gray-400">Min: {item.minLevel}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isOut ? 'bg-red-600' : isLow ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isOut
                            ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                            : isLow
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => updateStock(item.id, -10)}
                          className="p-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          title="Decrease Stock (-10)"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateStock(item.id, +50)}
                          className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-600 hover:text-white text-amber-600 dark:text-amber-400 text-xs font-semibold transition-colors"
                        >
                          Restock +50
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
