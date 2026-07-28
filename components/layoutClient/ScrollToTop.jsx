'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full glass border border-slate-200/50 dark:border-slate-800/60 shadow-xl hover:shadow-blue-500/10 text-slate-700 dark:text-slate-350 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}

export default ScrollToTop
