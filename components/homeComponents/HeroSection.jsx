import { assets } from '@/Assets/data'
import React from 'react'

const HeroSection = () => {
  return (
    <>
      <div className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>

        <div className='col-span-6 flex flex-col gap-6 items-center sm:items-start'>
          <h1 className='text-2xl font-bold text-center sm:text-left'>Hi, I'm</h1>
          <h1 className='text-4xl sm:text-5xl font-bold text-center sm:text-left'>Muhammad Abdullah</h1>
          <p className='text-lg text-center sm:text-left max-w-2xl'>A passionate developer specializing in building exceptional digital experiences. Currently, I'm focused on developing responsive web applications.</p>
          <div className='flex gap-4'>
            <a href="#contact" className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition'>Contact Me</a>
            <a href="#projects" className='px-6 py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition'>View Projects</a>
          </div>
        </div>


        <div className='col-span-6 flex flex-col gap-6 items-center sm:items-start'>
          <img src={assets.HeroImg} alt="Hero" className='w-full h-auto' />
        </div>

      </div>
    </>
  )
}

export default HeroSection