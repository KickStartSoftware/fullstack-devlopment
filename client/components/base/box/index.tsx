import React from 'react';
import classNames from 'classnames';
import type { BoxType } from './props';

const Box: BoxType = ({
  children,
  classname,
  as: Component = 'div',
  rounded,
  gutterBottom,
  gutterTop,
  shadow,
  width,
  center,
  ...rest
}) => {
  const classes = classNames(classname, {
    'mx-auto': center,
    'rounded-none': rounded === 'none',
    'rounded-sm': rounded === 'sm',
    'rounded-md': rounded === 'md',
    'rounded-lg': rounded === 'lg',
    'rounded-xl': rounded === 'xl',
    'rounded-2xl': rounded === '2xl',
    'rounded-full': rounded === 'full',
    'mb-1': gutterBottom === 'xs',
    'mb-2': gutterBottom === 'sm',
    'mb-4': gutterBottom === 'md',
    'mb-6': gutterBottom === 'lg',
    'mb-8': gutterBottom === 'xl',
    'mnb-0': gutterBottom === 'none',
    'mt-1': gutterTop === 'xs',
    'mt-2': gutterTop === 'sm',
    'mt-4': gutterTop === 'md',
    'mt-6': gutterTop === 'lg',
    'mt-8': gutterTop === 'xl',
    'mt-0': gutterTop === 'none',
    'shadow-none': shadow === 'none',
    'shadow-sm': shadow === 'sm',
    'shadow-md': shadow === 'md',
    'shadow-lg': shadow === 'lg',
    'shadow-xl': shadow === 'xl',
    'shadow-2xl': shadow === '2xl',
    'md:max-w-[350px]': width === 'xs',
    'md:max-w-screen-sm': width === 'sm',
    'md:max-w-screen-md': width === 'md',
    'md:max-w-[500px]': width === 'custom',
    'md:max-w-screen-lg': width === 'lg',
    'md:max-w-screen-xl': width === 'xl',
  });

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

Box.defaultProps = {
  as: 'div',
  rounded: 'default',
  gutterBottom: 'default',
  gutterTop: 'default',
  shadow: 'default',
  width: 'default',
  center: false,
};

export default Box;
