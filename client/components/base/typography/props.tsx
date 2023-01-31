import React from 'react';
import type { Gutter, ALign, Weight, Color, TextVariant } from '../types';

export interface ITypographyProps extends React.ComponentProps<any> {
  text: string | React.ReactNode;
  as?: React.ElementType;
  classname?: string;
  breakWord?: boolean;
  gutterBottom?: Gutter;
  gutterTop?: Gutter;
  textAlign?: ALign;
  variant: TextVariant;
  color?: Color;
  weight?: Weight;
}

export type TypographyType = React.ComponentType<ITypographyProps>;
