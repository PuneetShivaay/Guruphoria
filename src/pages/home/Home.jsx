import React from 'react'
import { useEffect } from 'react'
import Hero from './hero/Hero';

const Home = () => {

    useEffect(() => {
window.scrollTo(0,0);
  }, [])

  return (
    <div className='space-y-16 w-full min-h-screen flex flex-col pb-16'>
        {/* Hero Section */}
        <Hero />
        {/* Stats Section */}
        {/* Category Section */}
        {/* Programs Section */}
        {/* Quick Access Section */}
        {/* Blog Section */}
    </div>
  )
}

export default Home