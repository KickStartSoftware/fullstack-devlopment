import React, { useState } from 'react';

import ArrowDown from '../../assets/ArrowDown';
import ArrowUp from '../../assets/ArrowUp';

const FaqElement = ({ question, answer, index, toggle, open }: any) => {
  return (
    <div
      className={`bg-[#041d33] ${open ? 'h-full md:h-auto' : 'h-[5rem]'}`}
      onClick={() => toggle(index)}>
      <div className="relative z-10 flex items-center justify-between bg-[#041d33] h-full md:h-auto border-t  border-white py-[30px] lg:py-[20px]  font-semibold">
        <p className="text-[22px] sm:text-[30px]  leading-[28px]">{question}</p>
        <div className="">
          {open ? (
            <ArrowUp className="w-9 h-9" />
          ) : (
            <ArrowDown className="w-9 h-9" />
          )}
        </div>
      </div>
      <div className={`${open ? 'h-full  ' : 'h-0'}   overflow-hidden`}>
        <div
          className={`${
            open
              ? 'max-h-full   duration-500 ease-in-out after:max-h-[55px]'
              : 'max-h-0 duration-[200ms] ease-out'
          }`}>
          <div
            className={`${
              open
                ? 'translate-y-0 duration-[200ms] ease-in-out '
                : '-translate-y-20  duration-200 ease-in-out'
            }`}>
            <p className="thin -mt-1  duration-300 pb-[35px]">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqElement;
