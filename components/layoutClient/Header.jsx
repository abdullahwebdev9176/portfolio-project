'use client'

import Link from 'next/link'
import React from 'react'
import { SquareMenu, SquareX } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-800 text-white py-4 relative">
      <div className="flex justify-between items-center container mx-auto px-4 md:px-0">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>

        {/* Toggle Button */}
        <button
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 md:hidden"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <SquareX /> : <SquareMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 px-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/image-converter" className="hover:underline">
            Image Converter
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-[63px] left-0 w-full bg-gray-800 rounded shadow-lg flex flex-col space-y-2 p-4 md:hidden">
          <Link href="/about" className="hover:underline" onClick={handleMenuToggle}>
            About
          </Link>
          <Link href="/projects" className="hover:underline" onClick={handleMenuToggle}>
            Projects
          </Link>
          <Link href="/image-converter" className="hover:underline" onClick={handleMenuToggle}>
            Image Converter
          </Link>
          <Link href="/contact" className="hover:underline" onClick={handleMenuToggle}>
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
