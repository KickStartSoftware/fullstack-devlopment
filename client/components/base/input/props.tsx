import React from 'react';
import type { Gutter, Rounded, Shadow } from '../types';

export interface IInputProps extends React.ComponentProps<'input'> {
  classname?: string;
  shadow?: Shadow;
  rounded?: Rounded;
  gutterBottom?: Gutter;
  gutterTop?: Gutter;
  label?: string | React.ReactNode;
  varaint?: 'default' | 'primary' | 'white';
  inputSize?: 'default' | 'sm' | 'md' | 'lg';
}

export type InputType = React.ComponentType<IInputProps>;
