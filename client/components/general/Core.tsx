import Image from "next/image";
import React from "react";

const Core = () => {
  return (
    <div className="bg-[#040d18] px-6 py-12 mx-auto text-white text-center lg:flex items-center">
      <div className="pb-10">
        <p className="text-white font-bold text-[32px] ">
        The idea at it's core
        </p>
        <p className="pt-6 lg:px-8">
        This platform simplifies software downloads in bulk and offers a user friendly interface, vault dashboard, analytics, and a web-based solution!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 pt-7 gap-6">
          {/* Card1 */}
          <div className="flex items-center">
            <div className="rounded-[0.5rem] flex items-center justify-center w-20 h-12 bg-[#041d33] mr-4" >
              <img src="/assets/icons/analytics.svg" className="text-white w-8 h-8" alt="analytics"/>
            </div>
            <p className=" font-bold text-[20px]">Analytics</p>
          </div>
          {/* Card2 */}
          <div className="flex items-center gap-4 ">
          <div className="rounded-[0.5rem] flex items-center justify-center w-20 h-12 bg-[#041d33] mr-4" >
              <img src="/assets/icons/user-vault.svg" className="text-white w-8 h-8" alt="user-vault"/>
            </div>
            <p className=" font-bold text-[20px]  sm:order-2">User Vault</p>
          </div>
          {/* Card3 */}
          <div className="flex items-center">
          <div className="rounded-[0.5rem] flex items-center justify-center w-20 h-12 bg-[#041d33] mr-4" >
              <img src="/assets/icons/time-saving.svg" className="text-white w-8 h-8" alt="time-saving"/>
            </div>
            <p className="font-bold text-[20px]">Time Saving</p>
          </div>
          {/* Card4 */}
          <div className="flex items-center gap-4   ">
          <div className="rounded-[0.5rem] flex items-center justify-center w-20 h-12 bg-[#041d33] mr-4" >
              <img src="/assets/icons/web.svg" className="text-white w-9 h-9" alt="web"/>
            </div>
            <p className=" font-bold text-[20px]  sm:order-2"> Web Based </p>
          </div>
        </div>
      </div>
      {/* Image Here */}
      <div className="w-full h-[23rem]  mt-6 md:mt-0 text-black sm:px-6 ">
        <div className="bg-[#041d33] w-full h-full flex items-center justify-center rounded-[0.5rem] ">
        
        <Image src="/images/MERN-Stack.png" width={700} height={300} alt="MERN Stack" className="rounded-[0.5rem]" style={{ objectFit: 'cover' }} />
      
        </div>
      </div>
    </div>
  );
};

export default Core;
