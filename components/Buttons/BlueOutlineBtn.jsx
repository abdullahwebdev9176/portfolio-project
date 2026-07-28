import Link from 'next/link'
import React from 'react'

const BlueOutlineBtn = ({title, url}) => {
  return (
    <Link href={url} className="px-6 py-2.5 md:py-3 border border-blue-600/70 text-blue-600 dark:border-blue-500/50 dark:text-blue-400 font-medium rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition duration-300 transform hover:scale-[1.02] focus:outline-none w-max inline-flex items-center justify-center gap-2 cursor-pointer">
      {title}
    </Link>
  )
}

export default BlueOutlineBtn