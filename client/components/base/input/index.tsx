import React from 'react';
import Box from '../box';
import classNames from 'classnames';
import type { InputType } from './props';

const Input: InputType = ({
  label,
  shadow,
  rounded,
  gutterTop,
  gutterBottom,
  inputSize,
  varaint,
  classname,
  ...rest
}) => {
  const containerClasses = classNames(classname, {
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
  });

  const inputClass = classNames(
    'flex-1 w-full bg-transparent text-sm flex items-center px-2 md:px-3 text-white outline-none',
    {
      'rounded-none': rounded === 'none',
      'rounded-sm': rounded === 'sm',
      'rounded-md': rounded === 'md',
      'rounded-lg': rounded === 'lg',
      'rounded-xl': rounded === 'xl',
      'rounded-2xl': rounded === '2xl',
      'rounded-full': rounded === 'full',
      'shadow-none': shadow === 'none',
      'shadow-sm': shadow === 'sm',
      'shadow-md': shadow === 'md',
      'shadow-lg': shadow === 'lg',
      'shadow-xl': shadow === 'xl',
      'shadow-2xl': shadow === '2xl',
      'h-[24px] ': inputSize === 'sm',
      'h-[36px] ': inputSize === 'md',
      'h-[48px]': inputSize === 'lg',
      'border-[2px] border-white': varaint === 'white',
      'border-[1.5px] border-primary-light hover:border-primary-dark': varaint === 'primary',
    }
  );

  return (
    <Box
      classname={containerClasses}
      gutterTop={gutterTop}
      gutterBottom={gutterBottom}>
      <label
        className={classNames('text-white font-medium text-base mb-1 block', {
          hidden: !label,
        })}>
        {label}
      </label>
      <input className={inputClass} {...rest} />
    </Box>
  );
};

Input.defaultProps = {
  type: 'text',
  gutterTop: 'default',
  gutterBottom: 'default',
  varaint: 'primary',
  inputSize: 'lg',
  rounded: 'lg',
  shadow: 'none',
  autoCorrect: 'off',
};

export default Input;
