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
            link: "https://hafsa-health-blogger.vercel.app/"
        },
        {
            title: "Blog Website",
            image: assets.blogImg,
            link: "https://cstats.io/"
        },
    ];

    return (
        <>
            <div className="text-center my-14">
                <h2 className="text-2xl md:text-4xl font-bold">Projects</h2>
            </div>

            <div className='flex justify-center items-start flex-wrap'>
                {projects.map((project, index)=>{
                    return(
                        <div className='w-full md:w-1/3 p-4' key={index}>
                            <div className='bg-[var(--cardBg)] rounded-lg shadow-lg h-full flex flex-col'>
                                <div className='relative pt-[55%]'>
                                    <Image src={project.image} alt={project.title} className='absolute top-0 left-0 w-full h-full object-cover rounded-lg' />
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