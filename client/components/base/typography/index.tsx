import React from 'react';
import classNames from 'classnames';
import type { TypographyType } from './props';

const Typography: TypographyType = ({
  as: Component = 'p',
  color,
  weight ,
  gutterBottom ,
  gutterTop,
  textAlign,
  breakWord,
  text,
  variant,
  classname,
  ...rest
}) => {
  const classes = classNames(classname, {
    'text-5xl': variant === 'h1', // 40px
    'text-4xl': variant === 'h2', // 36px
    'text-3xl': variant === 'h3', // 32px
    'text-2xl': variant === 'h4', // 24px
    'text-xl': variant === 'h5', // 20px
    'text-lg': variant === 'h6', // 18px
    'text-base': variant === 'body', // 16px
    'text-sm': variant === 'subBody', // 14px
    'text-xs': variant === 'caption', // 12px
    'text-[22px] leading-[34px]': variant === 'overline', // 22px
    'text-black-dark': color === 'black',
    'text-white': color === 'white',
    'text-gray-400': color === 'gray',
    'text-primary-main': color === 'primary',
    'text-secondary-dark': color === 'secondary',
    'text-danger': color === 'danger',
    'text-warning': color === 'warning',
    'text-success': color === 'success',
    'font-light': weight === 'light',
    'font-normal': weight === 'regular',
    'font-medium': weight === 'medium',
    'font-semibold': weight === 'semibold',
    'font-bold': weight === 'bold',
    'font-extrabold': weight === 'extrabold',
    'mb-0.5': gutterBottom === 'xs',
    'mb-1': gutterBottom === 'sm',
    'mb-2': gutterBottom === 'md',
    'mb-3': gutterBottom === 'lg',
    'mb-4': gutterBottom === 'xl',
    'mnb-0': gutterBottom === 'none',
    'mt-0.5': gutterTop === 'xs',
    'mt-1': gutterTop === 'sm',
    'mt-2': gutterTop === 'md',
    'mt-3': gutterTop === 'lg',
    'mt-4': gutterTop === 'xl',
    'mt-0': gutterTop === 'none',
    'text-left': textAlign === 'left',
    'text-center': textAlign === 'center',
    'text-right': textAlign === 'right',
    'whitespace-normal break-all': breakWord,
  });

  return (
    <Component {...rest} className={classes}>
      {text}
    </Component>
  );
};

Typography.defaultProps = {
  color: 'white',
  weight: 'regular',
  gutterBottom: 'none',
  gutterTop: 'none',
  textAlign: 'left',
  breakWord: false,
};

export default Typography;
