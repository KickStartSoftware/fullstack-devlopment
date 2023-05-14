import React from "react";
import Image from "next/image";
import curvedline from "../../assets/bg2.png";
import curvedline2 from "../../assets/bg10.png";


const TermsPolicy = () => {
  return (
    <div aria-label="main" className="-mt-20">
      {/* CurverLineMobile*/}
      <div className="sm:hidden">
        <Image alt="none" src={curvedline} className="w-full h-20" />
      </div>
      {/* CurverLineWeb */}
      <div className="hidden sm:flex">
        <Image alt="none" src={curvedline2} className="w-full h-20" />
      </div>
      <div className=" bg-[#041d33] py-[60px]">
      <div className="px-6 pt-8 md:pt-4 md:max-w-[95vw] lg:max-w-[85vw] mx-auto bg">
      <div className="flex flex-col md:flex-row justify-between  items-center  mx-auto">
        {/* Left Side */}
        <div className="flex flex-col items-start  md:-mt-12">
          <h1 className="text-[33px] lg:text-[26px] xl:text-[25px] 2xl:text-[45px] font-bold text-white text-center md:whitespace-nowrap">
          Terms of Use<span className="text-[#0ff6f6]">/Service Agreement</span>
          </h1>
          <p className="text-white text-[20px]    mx-auto text-justify items-start pt-4">
          Welcome to KickStartSoftware. These Terms of Use govern your access to and use of our services, software, applications, and websites (collectively, the "Services"). By using our Services, you agree to be bound by these terms. Please read them carefully.
          </p>
        
       
          <h1 className="text-[33px] lg:text-[26px] xl:text-[25px] 2xl:text-[45px] font-bold text-white text-center md:whitespace-nowrap pt-8">
          1. Acceptance of Terms<span className="text-[#0ff6f6]"> of Use Agreement.</span>
          </h1>
          <p className="text-white text-[20px]    mx-auto text-justify items-start pt-1">
          By accessing, browsing, or using the Services, you agree to be bound by these Terms of Use, our Privacy Policy, and any additional terms that may apply to specific features of the Services. If you do not agree to these terms, you must not use the Services.
          </p>
          <h1 className="text-[33px] lg:text-[26px] xl:text-[25px] 2xl:text-[45px] font-bold text-white text-center md:whitespace-nowrap pt-8">
          2. Eligibility.
          </h1>
          <p className="text-white text-[20px]    mx-auto text-justify items-start pt-1">
          You must be at least 13 years old to use the Services. If you are between 13 and 18 years of age, you must have the permission of a parent or legal guardian to use the Services. By using the Services, you represent and warrant that you have the right, authority, and capacity to enter into and abide by these Terms of Use.
          </p>
          <h1 className="text-[33px] lg:text-[26px] xl:text-[25px] 2xl:text-[45px] font-bold text-white text-center md:whitespace-nowrap pt-8">
          3. Account<span className="text-[#0ff6f6]"> Security.</span>
          </h1>
          <p className="text-white text-[20px]    mx-auto text-justify items-start pt-1">
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify KickStartSoftware of any unauthorized use of your account or any other breach of security. KickStartSoftware will not be liable for any loss or damage arising from your failure to safeguard your account information.
          </p>
          <h1 className="text-[33px] lg:text-[26px] xl:text-[25px] 2xl:text-[45px] font-bold text-white text-center md:whitespace-nowrap pt-8">
          4. Term and <span className="text-[#0ff6f6]">Termination.</span>
          </h1>
          <p className="text-white text-[20px]    mx-auto text-justify items-start pt-1">
          These Terms of Use are effective until terminated by either you or KickStartSoftware. You may terminate your account at any time by contacting KickStartSoftware. KickStartSoftware may terminate your account, access to the Services, or any part thereof, at any time, for any reason, with or without notice.
          </p>
          <h1 className="text-[33px] lg:text-[26px] xl:text-[25px] 2xl:text-[45px] font-bold text-white text-center md:whitespace-nowrap pt-8">
          5. Copyright <span className="text-[#0ff6f6]">Policy.</span>
          </h1>
          <p className="text-white text-[20px]    mx-auto text-justify items-start pt-1">
          KickStartSoftware respects the intellectual property rights of others and expects users of the Services to do the same. If you believe that your copyrighted work has been copied and is accessible on the Services in a way that constitutes copyright infringement, please follow our Copyright Infringement Notice Procedure for notifying us of the alleged infringement.
          </p>
        </div>
        {/* Right Side */}
        
      </div>
    </div>
    </div>
    </div>
  );
};

export default TermsPolicy;
