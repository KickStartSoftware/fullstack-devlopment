import React from 'react';
import discord from '../../assets/discord.png';
import Image from 'next/image';
import curvedline from '../../assets/bg2.png';
import curvedline2 from '../../assets/bg10.png';
import { Box, Typography } from '../base';
import useDownloads from '../../hooks/downloads';
import useGetPackages, { categorizePackages } from '../../hooks/packages';

// static
import AppItem from "../general/AppItem";
import photoshop from "../../assets/photoshop.png";
import skype from "../../assets/skype.png";
import youtube from "../../assets/youtube.png";
// end

const Apps = () => {
  const { packages, loading } = useGetPackages();
  const categorized = categorizePackages(packages);
  const { postDownloads, isSelected, togglePackage } = useDownloads();
  // Static Data
  const apps = [
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 1 },
      app2: { name: "Photoshop", icon: photoshop, id: 2 },
      app3: { name: "Skype", icon: skype, id: 3 },
      app4: { name: "Youtube", icon: youtube, id: 4 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 5 },
      app2: { name: "Photoshop", icon: photoshop, id: 6 },
      app3: { name: "Skype", icon: skype, id: 7 },
      app4: { name: "Youtube", icon: youtube, id: 8 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 9 },
      app2: { name: "Photoshop", icon: photoshop, id: 10 },
      app3: { name: "Skype", icon: skype, id: 11 },
      app4: { name: "Youtube", icon: youtube, id: 12 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 13 },
      app2: { name: "Photoshop", icon: photoshop, id: 14 },
      app3: { name: "Skype", icon: skype, id: 15 },
      app4: { name: "Youtube", icon: youtube, id: 16 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 17 },
      app2: { name: "Photoshop", icon: photoshop, id: 18 },
      app3: { name: "Skype", icon: skype, id: 19 },
      app4: { name: "Youtube", icon: youtube, id: 20 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 21 },
      app2: { name: "Photoshop", icon: photoshop, id: 22 },
      app3: { name: "Skype", icon: skype, id: 23 },
      app4: { name: "Youtube", icon: youtube, id: 24 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 25 },
      app2: { name: "Photoshop", icon: photoshop, id: 26 },
      app3: { name: "Skype", icon: skype, id: 27 },
      app4: { name: "Youtube", icon: youtube, id: 28 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 29 },
      app2: { name: "Photoshop", icon: photoshop, id: 30 },
      app3: { name: "Skype", icon: skype, id: 31 },
      app4: { name: "Youtube", icon: youtube, id: 32 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 33 },
      app2: { name: "Photoshop", icon: photoshop, id: 34 },
      app3: { name: "Skype", icon: skype, id: 35 },
      app4: { name: "Youtube", icon: youtube, id: 36 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 37 },
      app2: { name: "Photoshop", icon: photoshop, id: 38 },
      app3: { name: "Skype", icon: skype, id: 39 },
      app4: { name: "Youtube", icon: youtube, id: 40 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 41 },
      app2: { name: "Photoshop", icon: photoshop, id: 42 },
      app3: { name: "Skype", icon: skype, id: 43 },
      app4: { name: "Youtube", icon: youtube, id: 44 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 45 },
      app2: { name: "Photoshop", icon: photoshop, id: 46 },
      app3: { name: "Skype", icon: skype, id: 47 },
      app4: { name: "Youtube", icon: youtube, id: 48 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 49 },
      app2: { name: "Photoshop", icon: photoshop, id: 50 },
      app3: { name: "Skype", icon: skype, id: 51 },
      app4: { name: "Youtube", icon: youtube, id: 52 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 53 },
      app2: { name: "Photoshop", icon: photoshop, id: 54 },
      app3: { name: "Skype", icon: skype, id: 55 },
      app4: { name: "Youtube", icon: youtube, id: 56 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 57 },
      app2: { name: "Photoshop", icon: photoshop, id: 58 },
      app3: { name: "Skype", icon: skype, id: 59 },
      app4: { name: "Youtube", icon: youtube, id: 60 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 61 },
      app2: { name: "Photoshop", icon: photoshop, id: 62 },
      app3: { name: "Skype", icon: skype, id: 63 },
      app4: { name: "Youtube", icon: youtube, id: 64 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 65 },
      app2: { name: "Photoshop", icon: photoshop, id: 66 },
      app3: { name: "Skype", icon: skype, id: 67 },
      app4: { name: "Youtube", icon: youtube, id: 68 },
    },
    {
      category: "Web Browsers",
      app1: { name: "Discord", icon: discord, id: 69 },
      app2: { name: "Photoshop", icon: photoshop, id: 70 },
      app3: { name: "Skype", icon: skype, id: 71 },
      app4: { name: "Youtube", icon: youtube, id: 72 },
    },
  ]; 
  // End
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
        {/* Static Data */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6  py-12 gap-6 max-w-[90vw] mx-auto">
          {apps.map((app) => (
            <AppItem
              category={app.category}
              app1={app.app1}
              app2={app.app2}
              app3={app.app3}
              app4={app.app4}
            />
          ))}
        </div> */}
        {/* End */}
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
        <div className=" flex items-center justify-center bg-[#0ff6f6] w-[15rem] mx-auto  rounded-full mt-4 hover:bg-[#26d3d3] transform duration-300 ease-in-out">
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
