import Image from "next/image";
import React from "react";
// import laptop from "../assets/laptop3.png";

import  Termsofuse from "../../assets/termsofuse.png";
// import pc from "../assets/pc.png";
const TermsHero = () => {
  return (
    <div className="px-6 pt-8 md:pt-4 md:max-w-[95vw] lg:max-w-[85vw] mx-auto">
      <div className="flex flex-col md:flex-row justify-between  items-center  mx-auto">
        {/* Left Side */}
        <div className="flex flex-col items-start  md:-mt-12">
          <h1 className="text-[33px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] font-bold text-white text-center md:whitespace-nowrap">
            Terms Of<span className="text-[#0ff6f6]"> Use</span>
          </h1>
          <p className="text-white text-[20px] max-w-[50rem]   mx-auto text-justify items-start pt-4">
          Welcome to KickStartSoftware, your trusted source for innovative software solutions. By using our services, you agree to comply with our Terms of Use and Privacy Policy, ensuring a seamless experience. Explore our diverse range of products and services, designed to cater to your unique needs. Don't hesitate to contact our support team for any queries or assistance. Discover the world of KickStartSoftware and unlock the potential of cutting-edge technology for your personal and professional growth. Join us on this exciting journey today!
          </p>
        </div>
        {/* Right Side */}
        <div className="sm:mt-6">
          <Image
            alt="none"
            src={Termsofuse}
            className="w-full max-w-[20rem] md:max-w-[25rem] lg:max-w-[27rem]  xl:max-w-[30rem] 2xl:max-w-[40rem] px-4 md:mb-8"
          />
        </div>
      </div>
    </div>
  );
};

export default TermsHero;
