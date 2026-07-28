'use client'

import React from 'react'
import Header from '@/components/layoutClient/Header'
import Footer from '@/components/layoutClient/Footer'
import { ThemeProvider } from 'next-themes'

const LayoutProviders = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex flex-col min-h-screen relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none -z-10" />
        
        <Header />
        <main className="flex-grow grid-bg">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default LayoutProviders