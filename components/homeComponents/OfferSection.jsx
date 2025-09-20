'use client'

import React from 'react'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

const OfferSection = () => {
    const offers = [
        {
            title: "Social Media",
            desc: "I can help manage, grow, and optimize your social media presence effectively.",
        },
        {
            title: "Web Development",
            desc: "Building modern, responsive, and user-friendly websites with React & Next.js.",
        },
        {
            title: "SEO Optimization",
            desc: "Improve your website’s visibility and ranking with best SEO practices for better results.",
        },
        {
            title: "UI/UX Design",
            desc: "Designing clean, modern, and user-friendly interfaces for better user experience.",
        },
    ]

    return (
        <>
            <div className='text-center my-14'>
                <h2 className='text-2xl md:text-4xl font-bold'>What I can do for you</h2>
            </div>

            {/* Swiper Added */}
            <Swiper
                modules={[Navigation]}
                navigation={true}
                spaceBetween={20}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {offers.map((offer, index) => (
                    <SwiperSlide key={index} className="h-auto">
                        <div className="w-full h-full bg-[#1b1b1c] m-2 hover:shadow-lg transition-shadow duration-300 cursor-pointer p-11 xl:p-16 flex flex-col">
                            <h6 className="text-2xl font-semibold mb-4">{offer.title}</h6>
                            <p className="text-white flex-grow">{offer.desc}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>


            <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          transform: scale(0.4); 
        }
        
      `}</style>
        </>
    )
}

export default OfferSection
