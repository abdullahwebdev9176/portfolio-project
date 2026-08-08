'use client'

import React from 'react'
import { Briefcase, GraduationCap, Calendar, Sparkles } from 'lucide-react'

const ExperienceTimeline = () => {
  const experiences = [
    {
      role: "Full Stack Web Developer",
      company: "Vizz Web Solutions",
      duration: "2025 - Present",
      desc: "Architecting, developing, and maintaining 150+ full-stack web applications for clients in the marine and yachting industry. Built modern interfaces using React.js, Next.js, Node.js, Express, Redux, Zustand, and Tailwind CSS.",
      icon: <Briefcase className="w-5 h-5 text-blue-500" />
    },
    {
      role: "Frontend Developer",
      company: "Vizz Web Solutions",
      duration: "2024 - 2025",
      desc: "Architected responsive web layouts, custom landing pages, and interactive UI components using HTML, CSS, JavaScript, and Bootstrap.",
      icon: <Briefcase className="w-5 h-5 text-indigo-500" />
    }
  ];

  const education = [
    {
      degree: "BS in Computer Science (BSCS)",
      school: "Virtual University of Pakistan, Islamabad",
      duration: "2022 - 2025",
      desc: "Completed Bachelor's degree with specialization in Software Engineering & Web Systems. Focused on algorithms, database management, and modern full-stack web applications.",
      icon: <GraduationCap className="w-5 h-5 text-blue-500" />
    },
    {
      degree: "ICS (Intermediate in Computer Science)",
      school: "Government Islamia College, Chiniot",
      duration: "2019 - 2021",
      desc: "Studied Computer Science, Mathematics, and Physics. Built strong foundational programming logic and computer hardware/software concepts.",
      icon: <GraduationCap className="w-5 h-5 text-teal-500" />
    }
  ];

  return (
    <section id="experience" className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Experience & Education</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto mt-4 mb-5"></div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A chronological timeline of my professional work history and academic foundations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Work Experience Column */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Work History
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 ml-3 space-y-10">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[35px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 group-hover:border-blue-500 transition-colors duration-300 shadow-xs z-10">
                    {exp.icon}
                  </span>
                  
                  {/* Timeline Card */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/55 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{exp.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-450 border border-blue-105/10">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2.5">
              <GraduationCap className="w-6 h-6 text-indigo-605 dark:text-indigo-405" />
              Education
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 ml-3 space-y-10">
              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[35px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 group-hover:border-indigo-500 transition-colors duration-300 shadow-xs z-10">
                    {edu.icon}
                  </span>
                  
                  {/* Timeline Card */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/55 hover:border-indigo-550/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{edu.school}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-450 border border-indigo-105/10">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {edu.desc}
                    </p>
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

export default ExperienceTimeline
