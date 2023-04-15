import Image from "next/image";
import React from "react";
// import laptop from "../assets/laptop3.png";

import  Privacy from "../../assets/privacy_policy.png";



// import pc from "../assets/pc.png";
const Privacyhero = () => {
  return (
    <div className="px-6 pt-8 md:pt-4 md:max-w-[95vw] lg:max-w-[85vw] mx-auto">
      <div className="flex flex-col md:flex-row justify-between  items-center  mx-auto">
        {/* Left Side */}
        <div className="flex flex-col items-start  md:-mt-12">
          <h1 className="text-[33px] lg:text-[40px] xl:text-[50px] 2xl:text-[60px] font-bold text-white text-center md:whitespace-nowrap">
            Privacy<span className="text-[#0ff6f6]"> & Policy</span>
          </h1>
          <p className="text-white text-[20px] max-w-[50rem]   mx-auto text-justify items-start pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            adipisci quis dignissimos iste possimus corporis, reiciendis dicta
            pariatur impedit non? Itaque, voluptatum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tenetur, adipisci quis dignissimos
            iste possimus corporis, reiciendis dicta pariatur impedit non?
            Itaque, voluptatum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tenetur, adipisci quis dignissimos iste possimus
            corporis, reiciendis dicta pariatur impedit non? Itaque, voluptatum.
          </p>
        </div>
        {/* Right Side */}
        <div className="sm:mt-6">
          <Image
            alt="none"
            src={Privacy}
            className="w-full max-w-[20rem] md:max-w-[25rem] lg:max-w-[27rem]  xl:max-w-[30rem] 2xl:max-w-[40rem] px-4 md:mb-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Privacyhero;
