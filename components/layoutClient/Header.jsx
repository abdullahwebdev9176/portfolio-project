import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <>
            <div className='bg-gray-800 text-white py-4 '>
                <div className='flex justify-between items-center container mx-auto'>

                    <Link href="/" className='text-2xl font-bold px-4'>Logo</Link>
                    <div className='space-x-4 px-4'>
                        <Link href="/about" className='hover:underline'>About</Link>
                        <Link href="/projects" className='hover:underline'>Projects</Link>
                        <Link href="/contact" className='hover:underline'>Contact</Link>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Header