'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Send, User, MessageSquare, Sparkles, MessageCircle, Github, Linkedin, FileText } from 'lucide-react'
import Link from 'next/link'

const ContactFormSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setSubmitMessage('')

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Form data:', data)
            setSubmitMessage('Message sent successfully! I\'ll get back to you soon.')
            reset()
        } catch (error) {
            setSubmitMessage('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-24 px-4 md:px-8 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Get in Touch</h2>
                    <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 rounded-full mx-auto mt-4 mb-5"></div>
                    <p className="text-slate-655 dark:text-slate-400 max-w-xl mx-auto">
                        Have a project in mind, want to collaborate, or have a job opportunity? Let's discuss it!
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Contact Cards */}
                    <div className="lg:col-span-5 space-y-8 animate-fade-in">
                        <div className="text-center lg:text-left">
                            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 border border-blue-500/15">
                                <Sparkles className="w-3.5 h-3.5" />
                                Let's Connect
                            </span>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Start a Conversation
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                I'm always open to discussing new web development projects, UI design challenges, full-time engineering roles, or freelance opportunities. Write to me, and let's build something awesome.
                            </p>
                        </div>

                        {/* Contact Channels Grid */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 hover:border-blue-500/25 transition-all duration-300 shadow-xs">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-xl flex items-center justify-center border border-blue-100/10">
                                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email</p>
                                    <a href="mailto:abdullahverse9176@gmail.com" className="text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        abdullahverse9176@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 hover:border-blue-500/25 transition-all duration-300 shadow-xs">
                                <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl flex items-center justify-center border border-emerald-100/10">
                                    <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-450" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone</p>
                                    <Link href="tel:+923460779176" className="text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        +92 346 0779176
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/50 bg-white dark:bg-slate-900/50 hover:border-blue-500/25 transition-all duration-300 shadow-xs">
                                <div className="flex-shrink-0 w-12 h-12 bg-purple-50 dark:bg-purple-950/50 rounded-xl flex items-center justify-center border border-purple-100/10">
                                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Location</p>
                                    <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                                        Islamabad, Pakistan
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Direct Social Shortcuts */}
                        <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 text-left">
                            <p className="text-xs font-bold text-slate-405 dark:text-slate-500 uppercase tracking-widest mb-4">Direct Messaging & Socials</p>
                            <div className="flex flex-wrap gap-3">
                                <a 
                                    href="https://wa.me/923460779176" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400 hover:bg-green-500/10 transition-colors text-xs font-bold cursor-pointer"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    WhatsApp Chat
                                </a>
                                <a 
                                    href="https://linkedin.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors text-xs font-bold cursor-pointer"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn Profile
                                </a>
                                <a 
                                    href="https://github.com/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-500/20 bg-slate-500/5 text-slate-850 dark:text-slate-200 hover:bg-slate-500/10 transition-colors text-xs font-bold cursor-pointer"
                                >
                                    <Github className="w-4 h-4" />
                                    GitHub Profile
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Glassmorphic Feedback Form */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-100/50 dark:shadow-none animate-fade-in">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                    Full Name *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400 dark:text-slate-650" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register('name', {
                                            required: 'Name is required',
                                            minLength: {
                                                value: 2,
                                                message: 'Name must be at least 2 characters'
                                            }
                                        })}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:outline-none text-slate-900 dark:text-white ${errors.name
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-200 dark:border-slate-800/80'
                                            }`}
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-405 dark:text-slate-650" />
                                    </div>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:outline-none text-slate-900 dark:text-white ${errors.email
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-200 dark:border-slate-800/80'
                                            }`}
                                        placeholder="Enter your email address"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Subject Field */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-405 mb-2">
                                    Subject
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FileText className="h-5 w-5 text-slate-405 dark:text-slate-650" />
                                    </div>
                                    <input
                                        type="text"
                                        {...register('subject')}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:outline-none text-slate-900 dark:text-white"
                                        placeholder="What's this about?"
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                    Message *
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3.5 left-4 pointer-events-none">
                                        <MessageSquare className="h-5 w-5 text-slate-400 dark:text-slate-655" />
                                    </div>
                                    <textarea
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Message must be at least 10 characters'
                                            }
                                        })}
                                        rows="5"
                                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none focus:outline-none text-slate-900 dark:text-white ${errors.message
                                                ? 'border-red-500 focus:ring-red-500'
                                                : 'border-slate-200 dark:border-slate-800/80'
                                            }`}
                                        placeholder="Tell me about your project or opportunity..."
                                    />
                                </div>
                                {errors.message && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-550 hover:to-indigo-555 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/10"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Sending Message...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </>
                                )}
                            </button>

                            {/* Success/Error Message */}
                            {submitMessage && (
                                <div className={`p-4 rounded-xl text-center text-sm font-semibold border ${submitMessage.includes('successfully')
                                        ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-405 border-green-200/50 dark:border-green-900/30'
                                        : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-405 border-red-200/50 dark:border-red-900/30'
                                    }`}>
                                    {submitMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactFormSection