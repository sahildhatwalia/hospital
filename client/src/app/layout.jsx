'use client';

import React, { useEffect } from 'react';
import './globals.css';
import Navbar from '../components/Navbar';
import ToastContainer from '../components/Toast';
import { useAuthStore } from '../store/useAuthStore';

export default function RootLayout({ children }) {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <html lang="en">
      <head>
        <title>AIIMS - Hospital OPD Queue & Patient Management Portal</title>
        <meta
          name="description"
          content="AIIMS Official Hospital Queue & OPD Patient Management System built with Next.js, WebSockets, and Express."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col font-sans transition-colors">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          {children}
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
