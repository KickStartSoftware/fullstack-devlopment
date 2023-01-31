import React from 'react';
import Image from 'next/image';
import logo from '../../assets/kickstart.png';
import { HiOutlineMenu } from 'react-icons/hi';
import { StyledLink } from '../base';
import { useAuthContext } from '../../context/authContext';

export interface INavProps {
  hideLinks?: boolean;
}

const Navbar: React.ComponentType<INavProps> = ({ hideLinks = false }) => {
  const authContext = useAuthContext();
  const appLinks = React.useMemo(
    () =>
      authContext?.isAuthenticated
        ? [
            {
              href: '/',
              text: 'Home',
            },
            {
              href: '/analytics',
              text: 'Analytics',
            },
            {
              href: '/vault',
              text: 'Personal Vault',
            },
            {
              href: '/about',
              text: 'About Us',
            },
          ]
        : [
            {
              href: '/',
              text: 'Home',
            },
            {
              href: '/analytics',
              text: 'Analytics',
            },
            {
              href: '/about',
              text: 'About Us',
            },
            {
              href: '/auth/sign-up',
              text: 'Sign Up',
            },
            {
              href: '/auth/sign-in',
              text: 'Sign In',
            },
          ],
    []
  );

  return (
    <div className=" flex items-center   justify-between py-4 px-4 md:px-8 ">
      {/* Left Side */}
      <StyledLink href="/">
        <Image src={logo} alt="" className="w-[8rem]" />
      </StyledLink>

      {/* Right */}
      {!hideLinks && (
        <div className="hidden md:flex text-white">
          <div className="flex items-center gap-8">
            {appLinks.map(({ href, text }) => (
              <StyledLink href={href} key={text} isNav>
                {text}
              </StyledLink>
            ))}
            {authContext?.isAuthenticated && (
              <button
                className="text-lg font-medium hover:text-primary-light"
                onClick={authContext.logout}>
                Sign out
              </button>
            )}
          </div>
        </div>
      )}

      {/* Right Side Mobile */}
      {!hideLinks && (
        <div className="md:hidden">
          <HiOutlineMenu className=" text-white w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
