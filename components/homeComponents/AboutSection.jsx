import { assets } from '@/Assets/data'
import Image from 'next/image'
import React from 'react'
import BlueFilledBtn from '../Buttons/BlueFilledBtn'

const AboutSection = () => {
    return (
        <>
            <div className='flex flex-col-reverse lg:flex-row gap-8 items-center pt-8'>
                <div className='w-full lg:w-1/2'>
                    <Image src={assets.AboutImg} alt='about' width={600} height={600} className='m-auto' />
                </div>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col justify-center h-full p-8 text-center lg:text-left'>
                        <h1 className='text-3xl lg:text-4xl font-bold mb-4'>About Me</h1>
                        <p className='text-sm md:text-lg mb-4'>I am a passionate developer with a strong background in creating dynamic and responsive web applications. My expertise lies in translating design concepts into functional user interfaces, ensuring a seamless user experience.</p>

                        <div className='mt-4 text-center lg:text-left'>
                            <BlueFilledBtn title='Learn More' url='/about' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection