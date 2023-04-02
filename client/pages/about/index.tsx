import React from 'react'
import Ahero from './AboutHero'
import Ameet from './About_meet'
import Navbar from '../../components/general/Navbar'
import Footer from '../../components/general/Footer'
function About() {
  return (
    <>
    <div className='gradient pb-10'>
    <Navbar/>
    <Ahero/>
    </div>
    <Ameet/>
    <Footer/>
    </>
  )
}

export default About