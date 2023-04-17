import React from "react";
import Image from "next/image";
import curvedline from "../../assets/bg2.png";
import curvedline2 from "../../assets/bg10.png";
const About_meet = () => {
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
      <div className="bg-[#041d33] text-white py-10 md:py-24 ">
        <p className="font-bold text-[40px] md:text-[55px] text-center">
          MEET THE TEAM
        </p>
        <p className="text-white text-[20px] max-w-[50rem]   mx-auto text-center items-center pt-1">
        Members involvement within the project.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-6 md:pt-12 container mx-auto place-items-center w-full">
          {/* Card 1 */}
          <div className="bg-[#040d18]  h-full md:h-[31rem] w-full gap-8  rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
            {/* Video */}
            <div className="mt-2">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/img-2.png"
                className="h-[310px] w-full"
              />
            </div>

            {/* Description */}
            <div className="">
              <p className="text-white font-bold text-[24px] text-center pt-3">
                Taylor Head
              </p>
              <p className="text-center pt-4 px-2">
              Project owner not only developed the entire project but also played a key role within the scope.
              </p>
            </div>
          </div>
          {/* Video 2 */}
          <div className="bg-[#040d18]  h-full md:h-[31rem] w-full   rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
            {/* Video */}
            <div className="mt-2">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/img-2.png"
                className="h-[310px] w-full"
              />
            </div>

            {/* Description */}
            <div className="">
              <p className="text-white font-bold text-[24px] text-center pt-3">
                Supervisor
              </p>
              <p className="text-center pt-4 px-2">
              To provide guidance and advice, it is recommended to hold regular meetings to ensure the project is progressing smoothly.
              </p>
            </div>
          </div>
          {/* Video 3 */}
          <div className="bg-[#040d18]  h-full md:h-[31rem] w-full   rounded-[0.5rem]  px-2 max-w-[24rem] mx-auto">
            {/* Video */}
            <div className="mt-2">
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/img-2.png"
                className="h-[310px] w-full"
              />
            </div>

            {/* Description */}
            <div className="">
              <p className="text-white font-bold text-[24px] text-center pt-3">
                Second Marker
              </p>
              <p className="text-center pt-4 px-2">
              Verify the work and compare it to the grade given by the supervisor, and also provide feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_meet;
