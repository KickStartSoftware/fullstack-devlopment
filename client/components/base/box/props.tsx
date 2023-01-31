import React from 'react';
import type { Rounded, Gutter, Shadow } from '../types';

export interface IBoxProps extends React.ComponentProps<any> {
  children?: React.ReactNode;
  as?: React.ElementType;
  classname?: string;
  gutterBottom?: Gutter;
  gutterTop?: Gutter;
  rounded?: Rounded;
  shadow?: Shadow;
  center?: boolean;
  width?: 'default' | 'custom' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export type BoxType = React.ComponentType<IBoxProps>;
