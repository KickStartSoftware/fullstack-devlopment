import React, { useState } from 'react';
import curvedline from '../../assets/bg2.png';
import curvedline2 from '../../assets/bg10.png';
import FaqElement from './FaqElement';
import Image from 'next/image';
const Faq = () => {
  const [faq, setFaq] = useState([
    {
      question: 'What information do you collect?  ',
      answer:
        'We collect personal information such as your name, email address, and payment details when you create an account or make a purchase. We also collect non-personal data, such as usage statistics and device information, to improve our services.',
      open: false,
    },
    {
      question: 'How do you use my information?  ',
      answer:
        'We use your personal information to provide and improve our services, process payments, and communicate with you. We may also use non-personal data for research and analysis to enhance our products and services.',
      open: false,
    },
    {
      question: 'Do you share my information with third parties?  ',
      answer:
        'We do not sell or share your personal information with third parties without your explicit consent, except when required by law or to protect our rights. We may share non-personal data with trusted partners for research and analysis purposes',
      open: false,
    },
    {
      question: 'How do you protect my information?  ',
      answer:
        'We employ industry-standard security measures, such as encryption and secure servers, to protect your information from unauthorized access or disclosure. We also regularly review and update our security practices to ensure the safety of your data.',
      open: false,
    },
    {
      question: 'Can I update or delete my personal information?  ',
      answer:
        'Yes, you can update or delete your personal information by accessing your account settings. If you need assistance, please contact our support team.',
      open: false,
    },
    {
      question: 'Do you use cookies?  ',
      answer:
        'Yes, we use cookies to enhance your experience on our website, analyze site usage, and support our marketing efforts. You can manage your cookie preferences in your browser settings.',
      open: false,
    },
    {
      question: 'How can I contact you regarding my privacy concerns?  ',
      answer:
        'If you have any questions or concerns about our Privacy Policy or your data, please contact us using the contact form on our website or by emailing our support team.',
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
