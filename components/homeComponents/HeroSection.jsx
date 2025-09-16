'use client'

import { assets } from '@/Assets/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  return (
    <>
      <div className='pt-8 md-pt-0 flex gap-[32px] flex-wrap lg:flex-nowrap'>

        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col justify-center items-center lg:items-start gap-4 h-full'>
            <h1 className='text-2xl font-bold text-center lg:text-left'>Hi, I'm</h1>
            <h1 className='text-[16px] sm:text-2xl font-bold text-center lg:text-left'>
              <TypeAnimation
                sequence={[
                  'Muhamad Abdullah',
                  1000,
                  'Web Developer',
                  1000,
                  'Figma to Code Expert',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
              />

            </h1>
            <p className='text-lg text-center lg:text-left max-w-2xl'>A passionate developer specializing in building exceptional digital experiences. Currently, I'm focused on developing responsive web applications.</p>
            <div className='flex gap-4'>
              <Link href="#contact" className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none'>Hire Me</Link>
              <Link href="#projects" className='px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition focus:outline-none'>Download CV</Link>
            </div>
          </div>
        </div>


        <div className='w-full lg:w-1/2'>
          <div className='rounded-full overflow-hidden bg-slate-800 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] mx-auto'> 
            <Image src={assets.HeroImg} alt="Hero" className='w-full h-auto' />
          </div>
        </div>

      </div>
    </>
  )
}

export default HeroSection