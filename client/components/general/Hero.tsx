import Image from 'next/image';
import React from 'react';
import laptop from '../../assets/laptop3.png';

const Hero = () => {
  return (
    <div className="px-6 pt-8 md:pt-4 md:max-w-[95vw] lg:max-w-[85vw] mx-auto">
      <div className="flex flex-col md:flex-row justify-between  items-center  mx-auto">
        {/* Left Side */}
        <div className="flex flex-col items-center  md:-mt-12">
          <h1 className="text-[33px]   lg:text-[40px] xl:text-[50px] 2xl:text-[60px] font-bold text-white text-center md:whitespace-nowrap">
            The key to <span className="text-[#0ff6f6]">downloading</span>
            <br />
            multiple software.
          </h1>
          <div className="flex items-center text-white text-[20px] lg:text-[25px] gap-4 pt-10">
            <div className=" bg-[#08eaea] px-6 py-1.5 font-semibold rounded-[0.5rem]">
              <button>Sign In</button>
            </div>
            <div className=" bg-[#08eaea] px-4 py-1.5 font-semibold rounded-[0.5rem]">
              <button>Try Now</button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="sm:mt-6">
          <Image
            alt=''
            src={laptop}
            className="w-full max-w-[20rem] md:max-w-[25rem] lg:max-w-[27rem]  xl:max-w-[30rem] 2xl:max-w-[40rem]   px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
