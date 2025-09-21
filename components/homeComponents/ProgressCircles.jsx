'use client'
import React, { useState, useEffect } from 'react'

const ProgressCircles = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [animatedPercentages, setAnimatedPercentages] = useState({})

    const skills = [
        { name: 'JavaScript', percentage: 85, color: '#3b82f6' },
        { name: 'React.js', percentage: 90, color: '#06b6d4' },
        { name: 'Next.js', percentage: 80, color: '#10b981' },
        { name: 'Node.js', percentage: 75, color: '#8b5cf6' },
        { name: 'CSS/Tailwind', percentage: 88, color: '#f59e0b' },
        { name: 'MongoDB', percentage: 70, color: '#ef4444' }
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
            }, index * 200) // Stagger animations
        })
    }, [])

    const CircleProgress = ({ skill, isVisible }) => {
        const radius = 45
        const circumference = 2 * Math.PI * radius
        const percentage = animatedPercentages[skill.name] || 0
        const strokeDashoffset = circumference - (percentage / 100) * circumference

        return (
            <div className={`flex flex-col items-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
                <div className="relative w-32 h-32 mb-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-300 dark:text-gray-700"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            stroke={skill.color}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                        />
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-foreground">
                            {percentage}%
                        </span>
                    </div>
                </div>
                {/* Skill name */}
                <h3 className="text-lg font-semibold text-center text-foreground mb-2">
                    {skill.name}
                </h3>
            </div>
        )
    }

    return (
        <section className="py-16 px-4">
            <div className='text-center mb-14'>
                <h2 className='text-2xl md:text-4xl font-bold text-foreground'>My Skills</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                    Here are my technical skills and proficiency levels in various technologies
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {skills.map((skill, index) => (
                    <CircleProgress 
                        key={skill.name} 
                        skill={skill} 
                        isVisible={isVisible}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProgressCircles