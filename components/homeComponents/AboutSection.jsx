'use client'

import { assets } from '@/Assets/data'
import Image from 'next/image'
import React, { useState } from 'react'
import { 
  Code, Layout, FileCode, Cpu, Layers,
  Terminal, GitBranch, Chrome, PenTool,
  HeartHandshake, Users, Lightbulb, Clock,
  Globe2, CheckCircle2 
} from 'lucide-react'

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            label: 'Skills',
            content: [
                { name: 'HTML5', desc: 'Markup Language', icon: <Code className="w-5 h-5 text-orange-500" /> },
                { name: 'CSS3 / Tailwind', desc: 'Styling Frameworks', icon: <Layout className="w-5 h-5 text-blue-500" /> },
                { name: 'JavaScript', desc: 'Core Programming', icon: <FileCode className="w-5 h-5 text-yellow-500" /> },
                { name: 'React.js', desc: 'UI Library', icon: <Cpu className="w-5 h-5 text-cyan-500" /> },
                { name: 'Next.js', desc: 'Fullstack Framework', icon: <Layers className="w-5 h-5 text-slate-800 dark:text-white" /> },
            ],
        },
        {
            label: 'Tools',
            content: [
                { name: 'VS Code', desc: 'Primary IDE', icon: <Terminal className="w-5 h-5 text-blue-500" /> },
                { name: 'Git & GitHub', desc: 'Version Control', icon: <GitBranch className="w-5 h-5 text-orange-650" /> },
                { name: 'Figma', desc: 'UI/UX Design Tools', icon: <PenTool className="w-5 h-5 text-purple-500" /> },
                { name: 'Chrome DevTools', desc: 'Debugging & Profiling', icon: <Chrome className="w-5 h-5 text-emerald-500" /> },
            ],
        },
        {
            label: 'Soft Skills',
            content: [
                { name: 'Communication', desc: 'Clear verbal & written style', icon: <HeartHandshake className="w-5 h-5 text-rose-500" /> },
                { name: 'Teamwork', desc: 'Collaborative contributor', icon: <Users className="w-5 h-5 text-indigo-500" /> },
                { name: 'Problem Solving', desc: 'Strong critical thinker', icon: <Lightbulb className="w-5 h-5 text-amber-500" /> },
                { name: 'Time Management', desc: 'Organized & deadline-focused', icon: <Clock className="w-5 h-5 text-teal-500" /> },
            ],
        },
        {
            label: 'Languages',
            content: [
                { name: 'English', desc: 'Professional Working Proficiency', icon: <Globe2 className="w-5 h-5 text-blue-600" /> },
                { name: 'Urdu', desc: 'Native/Bilingual Speaker', icon: <CheckCircle2 className="w-5 h-5 text-green-600" /> },
            ],
        },
    ];

    return (
        <section id="about" className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
            <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
                
                {/* Left Side: About Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-[480px]">
                            {assets.AboutImg ? (
                                <Image 
                                    src={assets.AboutImg} 
                                    alt="About Me" 
                                    width={500} 
                                    height={500} 
                                    className="rounded-xl object-cover hover:scale-[1.01] transition-transform duration-300" 
                                />
                            ) : (
                                <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">About Image</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Description and Tabs */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">About Me</h2>
                        <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto lg:mx-0 mb-6"></div>
                    </div>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                        I am a passionate developer with a strong background in creating dynamic and responsive web applications. 
                        My expertise lies in translating design concepts into functional, pixel-perfect user interfaces, 
                        ensuring a seamless and optimized experience across all devices and screen sizes.
                    </p>

                    {/* Tab Navigation */}
                    <div className="w-full mt-4">
                        <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 justify-center lg:justify-start w-fit">
                            {tabs.map((tab, idx) => (
                                <button
                                    key={tab.label}
                                    onClick={() => setActiveTab(idx)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-350 cursor-pointer ${
                                        activeTab === idx
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-black hover:bg-slate-300 dark:hover:bg-slate-850'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content Display */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                            {tabs[activeTab].content.map((item, i) => (
                                <div 
                                    key={i} 
                                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white dark:bg-slate-900/60 hover:shadow-md hover:border-blue-500/35 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-850 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{item.name}</h4>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default AboutSection
