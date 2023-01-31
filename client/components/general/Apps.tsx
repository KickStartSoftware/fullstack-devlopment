import React from 'react';
import discord from '../../assets/discord.png';
import Image from 'next/image';
import curvedline from '../../assets/bg2.png';
import curvedline2 from '../../assets/bg10.png';
import { Box, Typography } from '../base';
import useDownloads from '../../hooks/downloads';
import useGetPackages, { categorizePackages } from '../../hooks/packages';

const Apps = () => {
  const { packages, loading } = useGetPackages();
  const categorized = categorizePackages(packages);
  const { postDownloads, isSelected, togglePackage } = useDownloads();

  return (
    <div className="">
      {/* CurverLineMobile*/}
      <div className="sm:hidden">
        <Image alt="" src={curvedline} className="w-full h-20" />
      </div>
      {/* CurverLineWeb */}
      <div className="hidden sm:flex">
        <Image alt="" src={curvedline2} className="w-full h-20" />
      </div>
      <div className="bg-[#041d33] pb-8 ">
        {/* Title */}
        <h1 className="text-[40px] text-center text-white font-semibold pt-4 px-4">
          Pick the apps you want
        </h1>

        {/* Display the Apps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6  py-12 gap-6 max-w-[90vw] mx-auto">
          {Object.keys(categorized).map(category => (
            <Box key={category}>
              <Typography variant="h5" text={category} gutterBottom="md" />
              {categorized[category].map((p: any) => (
                <Box key={p._id} classname="flex items-center gap-x-4 mb-1">
                  <input
                    type="checkbox"
                    checked={isSelected(p)}
                    onChange={() => togglePackage(p)}
                  />
                  <label className="flex items-center gap-2">
                    <Image
                      alt=""
                      src={p.iconUrl}
                      width={20}
                      height={20}
                      className="w-5 "
                    />
                    <Typography
                      variant="body"
                      color="gray"
                      text={p.name}
                      weight="medium"
                      gutterBottom="none"
                    />
                  </label>
                </Box>
              ))}
            </Box>
          ))}
        </div>
        {/* Download */}
        <div className=" flex items-center justify-center bg-[#0ff6f6] w-[15rem] mx-auto  rounded-full mt-4">
          <button
            onClick={() => postDownloads()}
            className=" font-bold py-3.5 rounded-full text-[18px]">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Apps;
