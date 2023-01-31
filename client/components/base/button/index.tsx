import React from 'react';
import { useRouter } from 'next/router';
import type { ButtonType } from './props';
import type { ButtonEvent } from '../../../@types/events';
import classNames from 'classnames';

export const Button: ButtonType = ({
  text,
  href,
  size,
  type,
  loading,
  color,
  shadow,
  weight,
  rounded,
  fullwidth,
  variant,
  iconEnd,
  iconStart,
  onClick,
  disabled,
  classname,
  fontSize,
  gutterTop,
  gutterBottom,
  ...rest
}) => {
  const router = useRouter();

  const textClass = classNames({
    'text-xs': fontSize === 'xs',
    'text-sm': fontSize === 'sm',
    'text-base': fontSize === 'base',
    'text-md': fontSize === 'md',
    'text-lg': fontSize === 'lg',
    'text-xl': fontSize === 'xl',
    'text-2xl': fontSize === 'xxl',
  });

  // all classes
  const classes = classNames('tracking-wide outline-none', classname, {
    'shadow-sm': shadow,
    'w-full': fullwidth,
    'w-auto': !fullwidth,
    'py-1 px-3': size === 'sm',
    'py-2 px-6': size === 'md',
    'py-3 px-8': size === 'lg',
    'pl-0': variant === 'text',
    'font-light': weight === 'light',
    'font-normal': weight === 'regular',
    'font-medium': weight === 'medium',
    'font-semibold': weight === 'semibold',
    'font-bold': weight === 'bold',
    'font-extrabold': weight === 'extrabold',
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
    'opacity-70 cursor-not-allowed': disabled || loading,
    'opacity-100 cursor-pointer': !disabled && !loading,
    'text-white bg-primary-dark border-none hover:bg-primary-main':
      color === 'primary' && variant === 'contained',
    'bg-secondary-dark text-white border-none hover:bg-secondary-main':
      color === 'secondary' && variant === 'contained',
    'text-white bg-black-main border border-black-main hover:bg-black-light':
      color === 'black' && variant === 'contained',
    'text-primary-main bg-white border border-primary-main hover:bg-white/80':
      color === 'primary' && variant === 'outlined',
    'border border-secondary-main text-secondary-main bg-white hover:border-secondary-light':
      color === 'secondary' && variant === 'outlined',
    'text-black-main bg-white border border-black-main hover:bg-black-light':
      color === 'black' && variant === 'outlined',
    ' border-none text-primary-main bg-transparent hover:text-primary-light ':
      color === 'primary' && variant === 'text',
    'border-none text-secondary-dark bg-transparent hover:text-secondary-main':
      color === 'secondary' && variant === 'text',
    'border-none text-black-main bg-transparent hover:text-black-light':
      color === 'black' && variant === 'text',
    'border-none text-white bg-red-400 hover:bg-red-300':
      color === 'danger' && variant === 'contained',
    'border-none text-red-400 bg-transparent hover:text-red-400':
      color === 'danger' && variant === 'text',
  });

  if (href) {
    const handleClick = (event: ButtonEvent) => {
      if (onClick) {
        onClick(event);
      }
      router.push(href);
    };

    return (
      <button
        type={type}
        className={classes}
        onClick={handleClick}
        disabled={disabled}
        {...rest}>
        {loading ? (
          <div className="loader" />
        ) : iconStart || iconEnd ? (
          <div className="flex items-center justify-center gap-x-1">
            {iconStart}
            <span className={textClass}>{text}</span>
            {iconEnd}
          </div>
        ) : (
          text
        )}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}>
      {loading ? (
        <div className="loader" />
      ) : iconStart || iconEnd ? (
        <div className="flex items-center justify-center gap-2">
          {iconStart}
          <span className={textClass}>{text}</span>
          {iconEnd}
        </div>
      ) : (
        text
      )}
    </button>
  );
};

Button.defaultProps = {
  href: '',
  size: 'lg',
  type: 'button',
  loading: false,
  color: 'primary',
  shadow: false,
  weight: 'semibold',
  rounded: 'lg',
  fullwidth: false,
  variant: 'contained',
  fontSize: 'base',
};

export default Button;
