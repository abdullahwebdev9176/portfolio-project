import Link from 'next/link'
import React from 'react'

const BlueOutlineBtn = ({title, url}) => {
  return (
    <>
        <Link href={url} className='px-6 py-2 md:py-3 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition focus:outline-none w-max inline-block'>
            {title}
        </Link>
    </>
  )
}

export default BlueOutlineBtn