'use client'

import { assets } from '@/Assets/data'
import Image from 'next/image'
import React from 'react'

const ProjectSection = () => {

    const projects = [
        {
            title: "Blog Website",
            image: assets.blogImg,
            link: "https://hafsa-health-blogger.vercel.app/"
        },
        {
            title: "CSTATS Website",
            image: assets.cstats,
            link: "https://cstats.io/"
        },
        {
            title: "Trip Advisor",
            image: assets.tripAdvisorImg,
            link: "https://www.tripadvisor.com/"
        },
    ];

    return (
        <>
            <div className="text-center mt-28 mb-14">
                <h2 className="text-2xl md:text-4xl font-bold">Projects</h2>
            </div>

            <div className='flex justify-center items-start flex-wrap'>
                {projects.map((project, index) => {
                    return (
                        <div className='w-full md:w-1/3 p-4' key={index}>
                            <div className='bg-[var(--cardBg)] rounded-lg shadow-lg h-full flex flex-col relative group overflow-hidden cursor-pointer'>
                                <div className='relative pt-[55%]'>
                                    <Image src={project.image} alt={project.title} className='absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110' />

                                    {/* Blue Overlay with center origin animation */}
                                    <div className='absolute inset-0 bg-blue-500 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center flex flex-col justify-center items-center z-10'>
                                        {/* Project Title */}
                                        <h3 className='text-white text-xl md:text-2xl font-bold mb-4 text-center px-4'>
                                            {project.title}
                                        </h3>

                                        {/* Open Project Button */}
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-200'
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Open Project
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default ProjectSection