'use client';

import React from 'react';
import './globals.css';
import Navbar from '../components/Navbar';
import ToastContainer from '../components/Toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>EASPATAAL - Modern Hospital Management & Patient Portal</title>
        <meta
          name="description"
          content="EASPATAAL (MediCore) - Complete multi-role Hospital Management System built with Next.js App Router, Tailwind CSS, TypeScript, and shadcn/ui."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#F8F9FB] dark:bg-[#0F1115] text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-sans transition-colors">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
