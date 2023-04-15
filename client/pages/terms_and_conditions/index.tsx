import React from 'react'
import Ahero from './terms_hero'
import Ameet from './terms_policy'
import Navbar from '../../components/general/Navbar'
import Footer from '../../components/general/Footer'
function TermsConditions() {
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

export default TermsConditions