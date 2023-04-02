import React, { useState } from 'react';
import curvedline from '../../assets/bg2.png';
import curvedline2 from '../../assets/bg10.png';
import FaqElement from './FaqElement';
import Image from 'next/image';
const Faq = () => {
  const [faq, setFaq] = useState([
    {
      question: 'What is Kick Start Software?  ',
      answer:
        'Kick Start Software is a one-stop solution for downloading multiple software programs with just a click of a button. It saves users time and effort by allowing them to select and download their desired software utilities from a single platform.',
      open: false,
    },
    {
      question: 'How does the personal vault work?  ',
      answer:
        'The personal vault is a user-specific dashboard where you can save your preferred software selections. This allows you to quickly access and download your favorite software when setting up a new environment or device.',
      open: false,
    },
    {
      question: 'Is Kick Start Software free to use?  ',
      answer:
        'Yes, Kick Start Software is free to use. However, some software programs available on the platform may require a license or payment to their respective developers.',
      open: false,
    },
    {
      question: 'How do I create an account?  ',
      answer:
        'To create an account, simply click on the "Sign Up" button on the homepage and follow the registration process. You will need to provide a valid email address and create a secure password.',
      open: false,
    },
    {
      question: 'What technologies are used in the development of Kick Start Software?  ',
      answer:
        'Kick Start Software is built using a full technology stack, including React JS, Tailwind.css, jQuery, JavaScript, NodeJS, and MongoDB.',
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
      <div className="sm:hidden bg-[#040d18]/100">
        <Image alt="" src={curvedline} className="w-full h-24" />
      </div>

      {/* CurverLineWeb */}
      <div className="hidden sm:flex bg-[#040d18]/100">
        <Image alt="" src={curvedline2} className="w-full h-24" />
      </div>

      {/* Title */}
      <div className="text-center pb-4 pt-4">
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
