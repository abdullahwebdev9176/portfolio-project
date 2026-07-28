'use client'

import React from 'react'
import { Share2, Code2, Search, Palette } from 'lucide-react'

const OfferSection = () => {
    const offers = [
        {
            title: "Web Development",
            desc: "Building modern, highly-responsive, and performant web applications using React, Next.js, and clean Tailwind CSS architectures.",
            icon: <Code2 className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />,
            badge: "Core Service"
        },
        {
            title: "UI/UX & Figma to Code",
            desc: "Translating complex design systems, Figma drafts, and wireframes into clean, interactive, and modular React codebases.",
            icon: <Palette className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />,
            badge: "Expertise"
        },
        {
            title: "SEO Optimization",
            desc: "Implementing technical SEO structures, meta configurations, semantic structures, and optimizations to boost site search visibility.",
            icon: <Search className="w-8 h-8 text-emerald-600 dark:text-emerald-455 group-hover:scale-110 transition-transform duration-300" />,
            badge: "Optimization"
        },
        {
            title: "Social Media Strategy",
            desc: "Formulating digital growth strategies, optimizing web integrations, and managing product presence across social channels.",
            icon: <Share2 className="w-8 h-8 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform duration-300" />,
            badge: "Growth"
        },
    ]

    return (
        <section id="services" className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
            <div className="container mx-auto">
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white'>What I can do for you</h2>
                    <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto mt-4 mb-5"></div>
                    <p className="text-slate-650 dark:text-slate-400 max-w-2xl mx-auto">
                        Here are some of the professional services and solutions I offer to help build and optimize digital projects.
                    </p>
                </div>

                {/* Grid Layout of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {offers.map((offer, index) => (
                        <div 
                            key={index} 
                            className="w-full bg-white dark:bg-slate-900/60 hover:-translate-y-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/50 hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer p-8 flex flex-col items-start gap-5 relative group overflow-hidden"
                        >
                            {/* Hover gradient glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors duration-300"></div>
                            
                            {/* Icon Box */}
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 group-hover:border-blue-500/20 dark:group-hover:border-blue-550/20 transition-all duration-300">
                                {offer.icon}
                            </div>
                            
                            <div className="text-left">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{offer.badge}</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-450 transition-colors duration-300">{offer.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{offer.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OfferSection
