import React from 'react'
import Ahero from './privacyHero'
import Navbar from '../../components/general/Navbar'
import PrivacyFaq from '../../components/general/privacy_faq'
import Footer from '../../components/general/Footer'
function Privacy_policyPage() {
  return (
    <>
    <div className='gradient pb-10'>
    <Navbar/>
    <Ahero/>
    </div>
   <PrivacyFaq/>
    <Footer/>
    </>
  )
}

export default Privacy_policyPage