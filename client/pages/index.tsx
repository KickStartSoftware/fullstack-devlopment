import React from 'react';
import Hero from '../components/general/Hero';
import Features from '../components/general/Features';
import Apps from '../components/general/Apps';
import Videos from '../components/general/Videos';
import Core from '../components/general/Core';
import Faq from '../components/general/Faq';
import Repository from '../components/general/Repository';
import PublicLayout from '../components/layout/public';
import Image from "next/image";
import laptop from "../assets/laptop3.png";


export default function Home() {
  return (
    <PublicLayout>
      <Hero />
      <Apps />
      <Features />
      <Repository />
      <Videos />
      <Core />
      <Faq />
    </PublicLayout>
  );
}
