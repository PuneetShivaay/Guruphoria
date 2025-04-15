import React from 'react'

//import HeroImg from "../../assets/hero-1.png";
import HeroImg from "../../../assets/hero-1.png"

const Hero = () => {
  return (
    <div className='w-full md:h-screen h-auto bg-gradient-to-tr from-indigo-500/20 via-sky-700/20 via-20% to-purple-700/30 flex items-end justify-center md:px-16 sm:px-10 px-4 md:pt-0 md:pb-0 pt-[10ch] pb-8' >
        <div className="w-full flex-1 flex items-center justify-between md:gap-16 gap-4 md:flex-nowrap flex-wrap md:flex-row flex-col-reverse">
            {/* Hero Content */}
            <div className="md:w-[45%] w-full h-auto md:space-y-8 space-y-6">
                <div className="space-y-2">
                    <p className='text-lg md:text-2xl font-medium text-neutral-600'>
                        The Leader in Online Learning
                    </p>
                    <h1 className="md:text-[5rem] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-700 to-purple-700 leading-[1.35]">
                        Join Today & Start Learning
                    </h1>

                </div>
                <p className="text-lg font-normal text-neutral-800 md:pr-16 pr-0">
                    The best place to discover new learning resources, books, and courses.
                </p>

            </div>
            {/* Hero Image */}
            <div className="md:w-[50%] w-full aspect-squate flex items-end">
                <img src={HeroImg} alt="" className="w-full h-full object" />
            </div>
        </div>
    </div>
  )
}

export default Hero