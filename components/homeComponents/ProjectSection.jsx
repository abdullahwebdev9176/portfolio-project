'use client'

import { assets } from '@/Assets/data'
import Image from 'next/image'
import React from 'react'
import { ExternalLink, Layers, Link as LinkIcon } from 'lucide-react'

const ProjectSection = () => {
    const projects = [
        {
            title: "Service Markaz",
            desc: "An on-demand home services marketplace platform connecting users with local service professionals.",
            image: assets.serviceMarkaz,
            link: "https://www.servicemarkaz.com/",
            tags: ["React", "Node.js", "Tailwind CSS", "REST API"]
        },
        {
            title: "Blog Website",
            desc: "A modern healthcare blogging platform with optimized performance, high readability, and clean typography.",
            image: assets.blogImg,
            link: "https://hafsa-health-blogger.vercel.app/",
            tags: ["Next.js", "React", "Tailwind CSS", "Markdown"]
        },
        {
            title: "AlKhidmet Website",
            desc: "A welfare foundation platform highlighting community campaigns, volunteering, and online donation channels.",
            image: assets.alkhidmet,
            link: "https://alkhidmat-foundation-chiniot.vercel.app/",
            tags: ["Next.js", "React", "Tailwind CSS", "Vercel"]
        },
        {
            title: "CSTATS Website",
            desc: "A statistics and data analytics dashboard featuring real-time data charts and clean metrics filtering.",
            image: assets.cstats,
            link: "https://cstats.io/",
            tags: ["React", "Chart.js", "Tailwind CSS", "API Integration"]
        },
        {
            title: "Trip Advisor Concept",
            desc: "A responsive travel advisor layout with search listings, custom map markers, and booking flows.",
            image: assets.tripAdvisorImg,
            link: "https://www.tripadvisor.com/",
            tags: ["React", "Maps API", "CSS Grid", "Lucide Icons"]
        },
    ];

    return (
        <section id="projects" className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Featured Projects</h2>
                    <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto mt-4 mb-5"></div>
                    <p className="text-slate-650 dark:text-slate-400 max-w-2xl mx-auto">
                        Here are some of the modern web apps and UI designs I have built. Click to explore them live.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                    {projects.map((project, index) => {
                        return (
                            <div 
                                className='group bg-white dark:bg-slate-900/55 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 hover:border-blue-500/35 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden relative' 
                                key={index}
                            >
                                {/* Project Image Box */}
                                <div className='relative pt-[56%] overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-200/50 dark:border-slate-800/50'>
                                    {project.image ? (
                                        <Image 
                                            src={project.image} 
                                            alt={project.title} 
                                            fill
                                            className='object-cover transition-transform duration-500 group-hover:scale-105' 
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-450">Project Demo Preview</div>
                                    )}
                                    
                                    {/* Action link overlay */}
                                    <div className='absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-10'>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='bg-white text-slate-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer'
                                            aria-label="Open project"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Project details */}
                                <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
                                    {/* Badging list */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/30 dark:border-slate-700/55"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div>
                                        <h3 className='text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-250 mb-2'>
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                                            {project.desc}
                                        </p>
                                    </div>

                                    {/* Live Link Button */}
                                    <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-850 flex items-center">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-indigo-650 dark:hover:text-indigo-350 inline-flex items-center gap-1.5 transition-colors cursor-pointer group/link"
                                        >
                                            Explore Website 
                                            <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProjectSection