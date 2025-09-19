import { assets } from '@/Assets/data'
import Image from 'next/image'
import React from 'react'

const AboutSection = () => {
    return (
        <>
            <div className='flex'>
                <div className='w-1/2'>
                    <Image src={assets.AboutImg} alt='about' width={600} height={600} />
                </div>
                <div className='w-1/2'>
                    <div className='flex flex-col justify-center h-full p-8'>
                        <h1 className='text-4xl font-bold mb-4'>About Us</h1>
                        <p className='text-lg mb-4'>We are a leading company in our industry, committed to providing top-notch services and solutions to our clients. Our team of experts works tirelessly to ensure customer satisfaction and deliver exceptional results.</p>
                        <p className='text-lg mb-4'>With years of experience and a passion for innovation, we strive to stay ahead of the curve and continuously improve our offerings. Our mission is to empower businesses and individuals alike, helping them achieve their goals and reach new heights.</p>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>Learn More</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutSection