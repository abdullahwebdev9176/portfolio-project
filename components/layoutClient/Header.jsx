'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Image Converter', href: '/image-converter' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 glass border-b border-gray-200/20 dark:border-gray-800/30">
      <div className="flex justify-between items-center container mx-auto px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent flex items-center gap-1 group">
          M. Abdullah
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 group-hover:scale-125 transition-transform duration-350"></span>
        </Link>

        {/* Desktop Menu & Action Buttons */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-gray-200/50 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-900 text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
          )}
        </div>

        {/* Mobile Toggle & Theme Buttons */}
        <div className="flex items-center space-x-4 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full border border-gray-200/50 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-900 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          )}

          <button
            className="p-2 bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
            onClick={handleMenuToggle}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[68px] left-0 w-full glass border-b border-gray-200/20 dark:border-gray-800/30 flex flex-col space-y-3 p-6 md:hidden animate-fade-in shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-base font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-gray-200/10 dark:border-gray-800/10 transition-colors"
              onClick={handleMenuToggle}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

