import React from "react";
const Videos = () => {
  return (
    <div className="bg-[#040d18] text-white py-10 md:pt-16">
      <p className="font-bold  text-[40px] md:text-[55px] text-center">
        Videos
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8 mx-6 pt-6 md:pt-12">
        {/* Card 1 */}
        <div className="bg-[#041d33]  h-[25rem] md:h-[26rem] w-full   rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
          {/* Video */}
          <div className="h-[12rem] w-full rounded-[0.5rem]  bg-[#2c6aa1] mt-2">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/2cIcybpEUOw"
              title="Website Overview"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              Website Overview
            </p>
            <p className="text-center pt-4 px-2">
            Presenting an overview of our website to guide users effortlessly through its features.
            </p>
          </div>
        </div>
        {/* Video 2 */}
        <div className="bg-[#041d33]  h-[25rem] md:h-[26rem] w-full   rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
          {/* Video */}
          <div className="h-[12rem] w-full rounded-[0.5rem]  bg-[#2c6aa1] mt-2">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/7wrt6KBuwik"
              title="Deployment"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              Deployment
            </p>
            <p className="text-center pt-4 px-2">
            This video demonstrates how the application is deployed and divided into two sections.
            </p>
          </div>
        </div>
        {/* Video 3 */}
        <div className="bg-[#041d33]  h-[25rem] md:h-[26rem]  w-full   rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
          {/* Video */}
          <div className="h-[12rem] w-full rounded-[0.5rem]  bg-[#2c6aa1] mt-2">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/jRSPhvxV67o"
              title="How to use the website"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              How to use the website
            </p>
            <p className="text-center pt-4 px-2">
            This video provides a guide on how to use the login and personal vaults.
            </p>
          </div>
        </div>
        {/* Video 4 */}
        <div className="bg-[#041d33]  h-[25rem] md:h-[26rem]  w-full   rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
          {/* Video */}
          <div className="h-[12rem] w-full rounded-[0.5rem]  bg-[#2c6aa1] mt-2">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5KMqUDHM8zg"
              title="Technical Overview"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
            Technical Overview
            </p>
            <p className="text-center pt-4 px-2">
            Showcasing a technical overview of both the backend and frontend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Videos;
