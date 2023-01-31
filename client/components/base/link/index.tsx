import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import type { StyledLinkType } from './link-props';

const StyledLink: StyledLinkType = ({
  href,
  isNav,
  children,
  classname,
  ...props
}) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  const rootClass = classNames(
    classname,
    'font-semibold  hover:font-bold hover:text-primary-main',
    {
      'text-[18px]': isNav,
      'text-primary-main': !isNav,
      'text-white': !isActive && isNav,
      'text-primary-light': isActive && isNav,
    }
  );

  return (
    <Link href={href} {...props} className={rootClass}>
      {children}
    </Link>
  );
};

StyledLink.defaultProps = {
  isNav: false,
};

export default StyledLink;
