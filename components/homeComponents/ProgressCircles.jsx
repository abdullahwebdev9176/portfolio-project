'use client'
import React, { useState, useEffect } from 'react'
import { Code, Server, Flame, Layout, Database } from 'lucide-react'

const ProgressCircles = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [animatedPercentages, setAnimatedPercentages] = useState({})

    const skills = [
        { name: 'JavaScript', percentage: 85, color: '#f59e0b', icon: <Code className="w-5 h-5 text-amber-500" /> },
        { name: 'React.js', percentage: 90, color: '#06b6d4', icon: <Flame className="w-5 h-5 text-cyan-500" /> },
        { name: 'Next.js', percentage: 80, color: '#10b981', icon: <Layout className="w-5 h-5 text-emerald-500" /> },
        { name: 'Node.js', percentage: 75, color: '#8b5cf6', icon: <Server className="w-5 h-5 text-purple-500" /> },
        { name: 'CSS / Tailwind', percentage: 88, color: '#3b82f6', icon: <Layout className="w-5 h-5 text-blue-500" /> },
        { name: 'MongoDB', percentage: 70, color: '#ef4444', icon: <Database className="w-5 h-5 text-rose-500" /> }
    ]

    useEffect(() => {
        setIsVisible(true)
        
        // Animate percentages
        skills.forEach((skill, index) => {
            setTimeout(() => {
                let current = 0
                const increment = skill.percentage / 50 // 50 steps for smooth animation
                const timer = setInterval(() => {
                    current += increment
                    if (current >= skill.percentage) {
                        current = skill.percentage
                        clearInterval(timer)
                    }
                    setAnimatedPercentages(prev => ({
                        ...prev,
                        [skill.name]: Math.round(current)
                    }))
                }, 20)
            }, index * 150) // Stagger animations
        })
    }, [])

    const CircleProgress = ({ skill, isVisible }) => {
        const radius = 42
        const circumference = 2 * Math.PI * radius
        const percentage = animatedPercentages[skill.name] || 0
        const strokeDashoffset = circumference - (percentage / 100) * circumference

        return (
            <div className={`flex flex-col items-center bg-white dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-500 transform ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}>
                <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0" viewBox="0 0 100 100">
                        {/* Background track circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="transparent"
                            className="text-slate-100 dark:text-slate-800/80"
                        />
                        {/* Progress ring circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke={skill.color}
                            strokeWidth="7"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-300 ease-out"
                            style={{ 
                                filter: `drop-shadow(0 0 6px ${skill.color}50)`
                            }}
                        />
                    </svg>
                    {/* Inner Content (Percentage & Icon) */}
                    <div className="absolute flex flex-col items-center justify-center gap-0.5">
                        <span className="text-2xl font-black text-slate-800 dark:text-white">
                            {percentage}%
                        </span>
                        <div className="p-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700">
                            {skill.icon}
                        </div>
                    </div>
                </div>
                {/* Skill Title info */}
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 text-center">
                    {skill.name}
                </h3>
            </div>
        )
    }

    return (
        <section id="skills" className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
            <div className="container mx-auto">
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white'>My Technical Skills</h2>
                    <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto mt-4 mb-5"></div>
                    <p className="text-slate-650 dark:text-slate-400 max-w-2xl mx-auto">
                        A detailed breakdown of my technical capability and skill levels across key modern web frameworks and tools.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                    {skills.map((skill) => (
                        <CircleProgress 
                            key={skill.name} 
                            skill={skill} 
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProgressCircles