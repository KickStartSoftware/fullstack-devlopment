import React from "react";
import curvedline from "../../assets/bg2.png";
import curvedline2 from "../../assets/bg10.png";
import Image from "next/image";
import { StyledLink } from "../base";
import logo from "../../assets/kickstart.png";

const Footer = () => {
  return (
    <div className="bg-[#040d18] text-white">
      {/* CurverLineMobile*/}
      <div className="sm:hidden bg-[#040d18]/100 rotate-180">
        <Image alt="" src={curvedline} className="w-full h-20" />
      </div>
      {/* CurverLineWeb */}
      <div className="hidden sm:flex bg-[#040d18]/100 rotate-180">
        <Image alt="" src={curvedline2} className="w-full h-20" />
      </div>
      <div className="bg-[#040d18] text-center pb-10 md:flex sm:pr-12 flex justify-center md:max-w-[85vw] mx-auto pt-10">
        <div className="w-full">
          <StyledLink href="/">
            <Image src={logo} alt="" className="w-[8rem]" />
          </StyledLink>
          {/* <p className="text-[26px] font-bold text-center pt-8 sm:text-start sm:px-12 ">
            LOGO
          </p> */}
          <p className="text-center sm:text-start px-12 sm:pr-6 pt-2">
          This is a prototype platform with demo data designed to showcase best practices in full stack development!
          </p>
        </div>
        <div className=" sm:flex mx-auto justify-center gap-20 w-full ">
          {/* Quick Links 1*/}
          <div className="sm:text-start pt-8">
            <p className="text-[24px] font-bold whitespace-nowrap">
              Quick Links
            </p>
            <ul className="space-y-2 cursor-pointer">
              <li className="pt-4">
               <a href="/"><p>Home</p></a>
              </li>
              <li>
                <a href="/analytics"><p>Analytics</p></a>
              </li>
              <li>
                <a href="/vault"><p>Personal Vault</p></a>
              </li>
              <li>
                <a href="/about"><p>About Us</p></a>
              </li>
            </ul>
          </div>
          {/*Useful Links*/}
          <div className=" pt-8 whitespace-nowrap  sm:text-start">
            <p className="text-[24px] font-bold">Useful Links</p>
            <ul className="space-y-2 cursor-pointer">
              <li className="pt-4">
                <a href="auth/sign-up"><p>Sign up</p></a>
              </li>
              <li>
                <a href="auth/sign-in"><p>Account Login</p></a>
              </li>
              <li>
                <a href="/terms_and_conditions"><p>Terms & Conditons</p></a>
              </li>
              <li>
                <a href="/privacy_policy"><p>Privacy & Policy</p></a>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
