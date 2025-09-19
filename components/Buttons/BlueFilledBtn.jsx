import React from 'react';
import Link from 'next/link';

const BlueFilledBtn = ({title, url}) => {
  return (
    <Link href={url} className='px-6 py-2 md:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none w-max inline-block'>
      {title}
    </Link>
  )
}


export default BlueFilledBtn