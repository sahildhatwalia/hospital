'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Plus,
  Trash2,
  Send,
  Printer,
  X,
  Search,
  CheckCircle2,
  HeartPulse,
  ChevronLeft,
} from 'lucide-react';
import { useHospitalStore } from '../../../../store/useHospitalStore';
import { useAuthStore } from '../../../../store/useAuthStore';
import { showToast } from '../../../../components/Toast';

export default function NewPrescriptionPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { patients, createPrescription } = useHospitalStore();

  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [advice, setAdvice] = useState('Take rest, drink plenty of fluids, and complete full course of medication.');
  
  const [medicines, setMedicines] = useState([
    { name: 'Amoxicillin 500mg', dosage: '500mg', frequency: 'Three times daily', duration: '7 days', notes: 'Take after food' },
  ]);

  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [createdRx, setCreatedRx] = useState(null);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      { name: '', dosage: '1 tablet', frequency: 'Twice daily', duration: '5 days', notes: '' },
    ]);
  };

  const handleRemoveMedicine = (index) => {
    if (medicines.length === 1) {
      showToast('Prescription must include at least one medicine.', 'warning');
      return;
    }
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleUpdateMedicine = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSendToPharmacy = (e) => {
    e.preventDefault();
    if (!diagnosis) {
      showToast('Please enter a clinical diagnosis.', 'warning');
      return;
    }
    if (medicines.some((m) => !m.name)) {
      showToast('Please specify drug names for all medicine rows.', 'warning');
      return;
    }

    const newRx = createPrescription({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      age: selectedPatient.age,
      doctorName: user?.name || 'Dr. John Smith',
      diagnosis,
      advice,
      medicines,
    });

    setCreatedRx(newRx);
    showToast(`Prescription ${newRx.id} created & sent to Pharmacy!`, 'success');
    setPrintModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top Header & Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/doctor"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create New Prescription</h1>
      </div>

      {/* Main Prescription Form */}
      <form onSubmit={handleSendToPharmacy} className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-xl p-6 shadow-card space-y-6">
        
        {/* Step 1: Patient Search & Select */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Select Patient *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {p.condition}
                </option>
              ))}
            </select>

            {/* Patient Info Card summary */}
            {selectedPatient && (
              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900 dark:text-white">{selectedPatient.name}</span>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    {selectedPatient.age} yrs, {selectedPatient.gender} • Blood: {selectedPatient.bloodGroup}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold text-[10px]">
                  {selectedPatient.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Clinical Diagnosis */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Diagnosis & Clinical Observations *
          </label>
          <textarea
            rows={2}
            required
            placeholder="Describe clinical findings, symptoms, and primary diagnosis..."
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Step 3: Dynamic Medicine Rows */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Rx Medications & Dosage Schedule *
            </label>
            <button
              type="button"
              onClick={handleAddMedicine}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Medicine</span>
            </button>
          </div>

          <div className="space-y-3">
            {medicines.map((med, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
              >
                {/* Drug Name */}
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    required
                    placeholder="Drug Name (e.g. Amoxicillin)"
                    value={med.name}
                    onChange={(e) => handleUpdateMedicine(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Dosage */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Dosage (500mg)"
                    value={med.dosage}
                    onChange={(e) => handleUpdateMedicine(index, 'dosage', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Frequency */}
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    placeholder="Frequency (3x daily)"
                    value={med.frequency}
                    onChange={(e) => handleUpdateMedicine(index, 'frequency', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Duration */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Duration (7 days)"
                    value={med.duration}
                    onChange={(e) => handleUpdateMedicine(index, 'duration', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Remove Row Button */}
                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(index)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Advice & Instructions */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            General Advice & Lifestyle Instructions
          </label>
          <textarea
            rows={2}
            placeholder="Special instructions for patient..."
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => {
              showToast('Prescription saved as local draft.', 'info');
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Save as Draft
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send to Pharmacy & Print</span>
          </button>
        </div>
      </form>

      {/* Printable Prescription Modal (Letterhead Style) */}
      {printModalOpen && createdRx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-gray-900 border border-gray-200 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Bar */}
            <div className="p-4 bg-gray-900 text-white flex items-center justify-between no-print">
              <span className="text-xs font-bold tracking-wider uppercase">Official Prescription View</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Prescription</span>
                </button>
                <button
                  onClick={() => {
                    setPrintModalOpen(false);
                    router.push('/doctor');
                  }}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Letterhead Prescription Body */}
            <div className="p-8 overflow-y-auto bg-white text-gray-900 printable-prescription space-y-6">
              {/* Letterhead Header */}
              <div className="flex items-center justify-between border-b-2 border-blue-600 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                    <HeartPulse className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-blue-900">EASPATAAL MEDICORE</h2>
                    <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">
                      Tertiary Care & Research Center
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p className="font-bold text-gray-900">{createdRx.doctorName}</p>
                  <p>Dept. of Internal Medicine</p>
                  <p>Reg No: MED-884920</p>
                </div>
              </div>

              {/* Patient Banner */}
              <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg text-xs border border-gray-200">
                <div>
                  <span className="text-gray-500 block">Patient Name:</span>
                  <span className="font-bold text-gray-900">{selectedPatient.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Age / Gender:</span>
                  <span className="font-semibold text-gray-900">{selectedPatient.age} yrs, {selectedPatient.gender}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Date / Rx ID:</span>
                  <span className="font-semibold text-gray-900">{createdRx.date} ({createdRx.id})</span>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="text-xs">
                <span className="font-bold text-gray-700 block mb-1">Clinical Diagnosis:</span>
                <p className="p-2.5 rounded bg-gray-50 border border-gray-200 text-gray-800 font-medium">
                  {createdRx.diagnosis}
                </p>
              </div>

              {/* Rx Medicines Table */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-lg font-serif">
                  <span>Rx</span>
                  <div className="h-[1px] flex-1 bg-gray-200" />
                </div>
                <table className="w-full text-left text-xs border border-gray-200">
                  <thead className="bg-gray-100 font-bold text-gray-700 uppercase">
                    <tr>
                      <th className="p-2.5 border-b">Medicine</th>
                      <th className="p-2.5 border-b">Dosage</th>
                      <th className="p-2.5 border-b">Frequency</th>
                      <th className="p-2.5 border-b">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {createdRx.medicines.map((m, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold">{m.name}</td>
                        <td className="p-2.5">{m.dosage}</td>
                        <td className="p-2.5">{m.frequency}</td>
                        <td className="p-2.5">{m.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Advice */}
              <div className="text-xs">
                <span className="font-bold text-gray-700 block mb-1">Doctor's Advice:</span>
                <p className="text-gray-600 italic">{createdRx.advice}</p>
              </div>

              {/* Signature Block */}
              <div className="pt-8 flex items-center justify-between border-t border-gray-200 text-xs">
                <span className="text-gray-400">Generated via EASPATAAL EMR Portal</span>
                <div className="text-center">
                  <div className="font-serif italic text-base text-blue-900 mb-1">{createdRx.doctorName}</div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block border-t border-gray-300 pt-0.5">
                    Authorized Physician Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
