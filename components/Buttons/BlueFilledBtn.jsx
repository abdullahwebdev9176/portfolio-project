import React from 'react';
import Link from 'next/link';

const BlueFilledBtn = ({title, url}) => {
  return (
    <Link href={url} className="px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl transition duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none w-max inline-flex items-center justify-center gap-2 cursor-pointer">
      {title}
    </Link>
  )
}

export default BlueFilledBtn