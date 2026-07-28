'use client'

import React, { useEffect } from 'react'
import Header from '@/components/layoutClient/Header'
import Footer from '@/components/layoutClient/Footer'
import ScrollToTop from '@/components/layoutClient/ScrollToTop'
import { ThemeProvider } from 'next-themes'

const LayoutProviders = ({ children }) => {
  // Cursor glow tracker logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handleMouseMove);
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex flex-col min-h-screen relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none -z-10" />
        
        {/* Dynamic Dark Mode Mouse-Follow Glow */}
        <div 
          className="pointer-events-none fixed inset-0 z-30 opacity-0 dark:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(600px at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(59, 130, 246, 0.04), transparent 80%)'
          }}
        />

        <Header />
        <main className="flex-grow grid-bg">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}

export default LayoutProviders