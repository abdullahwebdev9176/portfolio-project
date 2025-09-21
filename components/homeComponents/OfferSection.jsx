'use client'

import React from 'react'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from "swiper/modules"

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                pagination={{ clickable: true }}
                navigation={{ enabled: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        navigation: { enabled: false },
                        pagination: { clickable: true },
                        slidesOffsetBefore: 20,
                        slidesOffsetAfter: 20,
                    },
                    767: {
                        slidesPerView: 2,
                        navigation: { enabled: true },
                        pagination: false,
                    },
                    1024: {
                        slidesPerView: 3,
                        navigation: { enabled: true },
                        pagination: false,
                    },
                }}
            >
                {offers.map((offer, index) => (
                    <SwiperSlide key={index} className="h-auto">
                        <div className="w-full h-full bg-[var(--cardBg)] hover:shadow-lg transition-shadow duration-300 cursor-pointer p-11 xl:p-16 flex flex-col">
                            <h6 className="text-2xl font-semibold mb-4 text-[var(--textColor)]">{offer.title}</h6>
                            <p className="text-[var(--textColor)] flex-grow">{offer.desc}</p>
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
