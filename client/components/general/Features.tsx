import Image from 'next/image';
import React from 'react';
import straight from '../../assets/straight.png';
import CloudSvg from '../../assets/CloudSvg';
import DownloadSvg from '../../assets/DownloadSvg';
import Secure from '../../assets/secure.png';


const Features = () => {
  return (
    <div className="-mt-8  bg-[#041d33] ">
      {/* CurverLineMobile*/}
      <div className="">
        <Image
          alt=""
          src={straight}
          className="w-full  h-[5rem] sm:h-[7.5rem]"
        />
      </div>
      {/* Title */}
      <div className="bg-[#041224] px-5">
        <h1 className="text-[40px] text-center text-white font-semibold pb-4 px-4">
          Features
        </h1>
        <p className="text-white text-[20px] max-w-[50rem]   mx-auto text-center pt-4 px-6">
        Kick Start Software solves tedious software downloads by offering one-click bulk downloads, personalized vaults, and analytics insights based on a user-friendly web platform.
        </p>
      </div>

      {/* Display features */}
      <div className="bg-[#041224]   ">
        <div className="flex flex-col sm:flex-row items-center justify-center text-center max-w-[90vw] mx-auto  pt-12 space-y-14 sm:space-y-0">
          {/* Feature 1 */}
          <div className="flex justify-center flex-col items-center sm:pt-12 px-6">
            <CloudSvg />
            <p className="font-bold text-[25px] text-white pt-4">Web Based</p>
            <p className="text-white text-[17px] pt-2 md:px-3">
            Web-based platform, users can quickly access, select, and download their favourite software utility from any device with internet access.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex justify-center flex-col items-center  sm:pt-12  px-6">
            <DownloadSvg />
            <p className="font-bold text-[25px] text-white pt-4">Bulk Downloading</p>
            <p className="text-white text-[17px] pt-2  md:px-3">
            One-click Volume Downloading compresses chosen software into a single zip file, allowing for rapid deployment and a simplified installation process.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex justify-center flex-col items-center  sm:pt-12  px-6">
            <Image alt="" src={Secure} />
            <p className="font-bold text-[25px] text-white pt-4">Personal Vault</p>
            <p className="text-white text-[17px] pt-2  md:px-3">
            Personal Vault offers a secure, customized dashboard for users to store and access favourite software selections, ensuring quick, convenient downloads.
            </p>
          </div>
        </div>
      </div>
      {/* CurverLineMobile*/}
      <div className="pt-12 sm:pt-20 bg-[#041224] ">
        <Image
          alt=""
          src={straight}
          className="w-full h-[5rem] sm:h-[7.5rem] rotate-180 bg-[#041d33]/100 "
        />
      </div>
    </div>
  );
};

export default Features;
