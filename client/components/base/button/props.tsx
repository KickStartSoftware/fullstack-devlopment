import React from 'react';
import type { Color, FontSize, Rounded, Weight ,Gutter} from '../types';

export interface IButtonProps extends React.ComponentProps<'button'> {
  href?: string;
  loading?: boolean;
  classname?: string;
  fullwidth?: boolean;
  text: string | React.ReactNode;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
  shadow?: boolean;
  fontSize?: FontSize;
  color?: Color;
  weight?: Weight;
  rounded?: Rounded;
  gutterBottom?: Gutter;
  gutterTop?: Gutter;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'text' | 'outlined' | 'contained';
}

export type ButtonType = React.ComponentType<IButtonProps>;
