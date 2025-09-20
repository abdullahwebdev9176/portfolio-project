'use client'
import { assets } from '@/Assets/data'
import Image from 'next/image'
import React, { useState } from 'react'

const AboutSection = () => {

    const [activeTab, setActiveTab] = useState(0);


    const tabs = [
        {
            label: 'Skills',
            content: [
                'HTML',
                'CSS',
                'JavaScript',
                'React',
                'Next.js',
            ],
        },
        {
            label: 'Tools',
            content: [
                'VS Code',
                'Git',
                'Figma',
                'Chrome DevTools',
            ],
        },
        {
            label: 'Soft Skills',
            content: [
                'Communication',
                'Teamwork',
                'Problem Solving',
                'Time Management',
            ],
        },
        {
            label: 'Languages',
            content: [
                'English',
                'Urdu',
            ],
        },
    ];



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

                        <div>

                            <div className='flex gap-3 md:gap-4 mb-3 cursor-pointer justify-start'>
                                {tabs.map((tab, idx) => (
                                    <span
                                        key={tab.label}
                                        onClick={() => setActiveTab(idx)}
                                        className={`text-sm md:text-md font-medium relative 
                                        ${activeTab === idx
                                                ? 'underline underline-offset-4 decoration-2 decoration-blue-600'
                                                : 'no-underline hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-blue-400'
                                            }`}
                                    >
                                        {tab.label}
                                    </span>
                                ))}
                            </div>

                            <ul>
                                {tabs[activeTab].content.map((item, i) => (
                                    <li key={i} className='text-left text-sm md:text-md'>{item}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection