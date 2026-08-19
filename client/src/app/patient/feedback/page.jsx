'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MessageSquare, Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useHospitalStore } from '../../../store/useHospitalStore';
import { showToast } from '../../../components/Toast';

export default function PatientFeedbackPage() {
  const { addFeedback } = useHospitalStore();

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comments) {
      showToast('Please provide your name and feedback comments.', 'warning');
      return;
    }

    addFeedback({ name, department, rating, comments });
    showToast('Thank you! Your feedback has been submitted to hospital administration.', 'success');
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      <div className="flex items-center justify-between">
        <Link
          href="/patient"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Patient Home</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#1A1D23] border border-gray-200 dark:border-[#2D3748] rounded-2xl p-8 shadow-card">
        
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/60 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback Received!</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We appreciate your valuable feedback. Your input helps us continually improve hospital care and service standards.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setComments('');
              }}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Patient Feedback</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tell us about your recent hospital experience and care quality
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Department Visited
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="OPD & Reception">OPD & Reception</option>
                <option value="Pharmacy">Pharmacy</option>
              </select>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Overall Satisfaction Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-8 h-8 ${star <= rating ? 'fill-amber-400' : 'text-gray-300 dark:text-gray-700'}`} />
                  </button>
                ))}
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 ml-2">
                  {rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Comments & Suggestions *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Share any specific details about doctor attention, wait time, or nursing staff..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
