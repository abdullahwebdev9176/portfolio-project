'use client'

import { assets } from '@/Assets/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { Atom, Layers, Figma, Wind } from 'lucide-react'
import BlueFilledBtn from '../Buttons/BlueFilledBtn'
import BlueOutlineBtn from '../Buttons/BlueOutlineBtn'

const HeroSection = () => {
  const techStack = [
    { name: 'React', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { name: 'Next.js', color: 'bg-slate-900/10 dark:bg-white/10 text-slate-800 dark:text-slate-200 border-slate-900/20 dark:border-white/20' },
    { name: 'Tailwind CSS', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
    { name: 'JavaScript', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { name: 'Figma to Code', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:py-32 px-4 md:px-8">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse duration-4000"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl -z-10 animate-pulse duration-3000"></div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider animate-bounce">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            Available for new opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hi, I'm <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  'Muhammad Abdullah',
                  2000,
                  'a Web Developer',
                  2000,
                  'Figma to Code Expert',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            A passionate developer specializing in building exceptional digital experiences. Currently, I'm focused on developing responsive web applications, interactive interfaces, and clean, modular systems.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <BlueFilledBtn title="Hire Me" url="#contact" />
            <BlueOutlineBtn title="Download CV" url="#about" />
          </div>

          {/* Micro Tech Stack Badges */}
          <div className="pt-8 border-t border-slate-200/50 dark:border-slate-800/50 w-full">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Core Tech Stack</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`text-xs font-medium px-3 py-1 rounded-lg border ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Avatar Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative group">
            {/* Ambient Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Double Border Wrap */}
            <div className="relative rounded-full p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-white/10 dark:border-slate-800/50">
              <div className="rounded-full overflow-hidden bg-slate-800 w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] transition-transform duration-500 group-hover:scale-[1.02] border-4 border-white dark:border-slate-900 shadow-2xl relative">
                {assets.profile ? (
                  <Image 
                    src={assets.profile} 
                    alt="Muhammad Abdullah" 
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-3xl font-bold">MA</div>
                )}
              </div>
            </div>

            {/* Floating Tech Badges */}
            {/* Top Left - React */}
            <div className="absolute -top-4 -left-4 z-20 p-3 rounded-2xl glass border border-blue-500/30 text-blue-550 shadow-lg animate-float-slow">
              <Atom className="w-6 h-6 animate-spin" style={{ animationDuration: '10s' }} />
            </div>

            {/* Top Right - Next.js */}
            <div className="absolute -top-2 -right-4 z-20 p-3 rounded-2xl glass border border-slate-500/30 text-slate-800 dark:text-white shadow-lg animate-float-medium">
              <Layers className="w-6 h-6" />
            </div>

            {/* Bottom Left - Figma */}
            <div className="absolute -bottom-2 -left-6 z-20 p-3 rounded-2xl glass border border-purple-500/30 text-purple-500 shadow-lg animate-float-fast">
              <Figma className="w-6 h-6" />
            </div>

            {/* Bottom Right - Tailwind */}
            <div className="absolute -bottom-4 -right-4 z-20 p-3 rounded-2xl glass border border-cyan-500/30 text-cyan-500 shadow-lg animate-float-slow">
              <Wind className="w-6 h-6" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HeroSection