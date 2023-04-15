import React, { useState } from 'react';
import curvedline from '../../assets/bg2.png';
import curvedline2 from '../../assets/bg10.png';
import FaqElement from './FaqElement';
import Image from 'next/image';
const Faq = () => {
  const [faq, setFaq] = useState([
    {
      question: 'Amen lol dolor sit amet?  ',
      answer:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad laborum perferendis!',
      open: false,
    },
    {
      question: 'Rtrem ipsum dolor sit amet?  ',
      answer:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad laborum perferendis!',
      open: false,
    },
    {
      question: 'Orem ipsusm dolor sit adsamet!  ',
      answer:
        'OpLorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad laborum perferendis!',
      open: false,
    },
    {
      question: 'Lorem dsipsum dolor sit amdsaet?  ',
      answer:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad laborum perferendis!',
      open: false,
    },
    {
      question: 'Wdsaorem ipsum dolor sit amet?  ',
      answer:
        'Lordsaem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad labordsaum perferendis!',
      open: false,
    },
    {
      question: 'Wdsaorem ipsum dolor sit amet?  ',
      answer:
        'Lordsaem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad labordsaum perferendis!',
      open: false,
    },
    {
      question: 'Wdsaorem ipsum dolor sit amet?  ',
      answer:
        'Lordsaem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ad labordsaum perferendis!',
      open: false,
    },
   
  ]);

  const toggle = (index: number) => {
    setFaq(
      faq.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };
  return (
    <div
      id="faq"
      className="flex flex-col bg-[#041d33]  md:flex text-white overflow-hidden pb-6">
      {/* CurverLineMobile*/}
      <div className="sm:hidden">
        <Image alt="none" src={curvedline} className="w-full h-20" />
      </div>
      {/* CurverLineWeb */}
      <div className="hidden sm:flex">
        <Image alt="none" src={curvedline2} className="w-full h-20" />
      </div>

      {/* Title */}
      <div className="text-center pb-4 pt-4 bg-[#041d33]">
        <p className="text-[26px] leading-[54px] font-semibold pb-8 md:-mt-2 ">
          Frequently asked questions
        </p>
        <p className="text-[46px] leading-[54px] font-semibold pb-8 md:-mt-8 ">
          Common question and answer
        </p>
      </div>

      {/* FAQ */}
      <div className="pb-1 md:w-[80%] mx-auto px-4 ">
        {faq.map((faq, index, key) => (
          <FaqElement
            question={faq.question}
            answer={faq.answer}
            open={faq.open}
            index={index}
            key={index}
            toggle={toggle}
          />
        ))}
        <div className="border-b pb-1 border-white"></div>
      </div>
    </div>
  );
};

export default Faq;
