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
              src="https://www.youtube.com/embed/WG5ikvJ2TKA"
              title="Frontend web development - a complete overview"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              Lorem Ipsum
            </p>
            <p className="text-center pt-4 px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis,
              alias! Lorem ipsum dolor sit amet consectetur
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
              src="https://www.youtube.com/embed/WG5ikvJ2TKA"
              title="Frontend web development - a complete overview"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              Lorem Ipsum
            </p>
            <p className="text-center pt-4 px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis,
              alias! Lorem ipsum dolor sit amet consectetur
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
              src="https://www.youtube.com/embed/WG5ikvJ2TKA"
              title="Frontend web development - a complete overview"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              Lorem Ipsum
            </p>
            <p className="text-center pt-4 px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis,
              alias! Lorem ipsum dolor sit amet consectetur
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
              src="https://www.youtube.com/embed/WG5ikvJ2TKA"
              title="Frontend web development - a complete overview"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {/* Description */}
          <div className="">
            <p className="text-white font-bold text-[24px] text-center pt-3">
              Lorem Ipsum
            </p>
            <p className="text-center pt-4 px-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis,
              alias! Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Videos;
