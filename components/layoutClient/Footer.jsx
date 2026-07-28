'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-gray-200/25 dark:border-gray-950/20 transition-all duration-300 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              Muhammad Abdullah
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Building high-performance, beautiful web interfaces.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 items-center">
            <Link
              href="https://github.com/abdullahverse9176"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-350 hover:scale-110 shadow-xs cursor-pointer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/muhammad-abdullah-3467b3202/?skipRedirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-350 hover:scale-110 shadow-xs cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:abdullahverse9176@gmail.com"
              className="p-2.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all duration-350 hover:scale-110 shadow-xs cursor-pointer"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200/50 dark:border-gray-850" />

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} Muhammad Abdullah. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
