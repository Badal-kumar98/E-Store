import React from 'react'
import './heroSection.css'
import hero1 from "../../assets/image/home1.jpg"

const HeroSection = () => {
  return (
    <div className="hero-container">
      <img src={hero1} className='hero-img' alt="hero" />
    </div>
  )
}

export default HeroSection
