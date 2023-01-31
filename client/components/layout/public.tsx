import React from 'react';
import { INavProps } from '../general/Navbar';
import classNames from 'classnames';
import Navbar from '../general/Navbar';
import Footer from '../general/Footer';

export interface IPublicLayoutProps extends INavProps {
  showNav?: boolean;
  fullScreen?: boolean;
  showFooter?: boolean;
  children?: React.ReactNode;
  containerClass?: string;
  showGradientBackground?: boolean;
}

const PublicLayout: React.ComponentType<IPublicLayoutProps> = ({
  children,
  fullScreen = true,
  showNav = true,
  showFooter = true,
  containerClass,
  showGradientBackground = true,
  ...rest
}) => {
  return (
    <div
      className={classNames('gradient', {
        hidden: !showGradientBackground,
        'min-h-screen': fullScreen,
      })}>
      {showNav && <Navbar {...rest} />}
      <div
        className={classNames(containerClass, {
          'min-h-screen': fullScreen && !showGradientBackground,
          'min-h-[70vh]': showGradientBackground,
        })}>
        {children}
      </div>
      {showFooter && <Footer />}
    </div>
  );
};

export default PublicLayout;
