import React from 'react';
import classNames from 'classnames';
import { Box } from '../base';

export interface IContentProps {
  children: React.ReactNode;
  classname?: string;
}

export const Content: React.FC<IContentProps> = ({ children, classname }) => {
  return (
    <Box classname="bg-[#041d33]">
      <Box
        classname={classNames(
          'min-h-screen w-full px-4 md:max-w-[95vw] pt-10 md:mx-auto',
          classname
        )}>
        {children}
      </Box>
    </Box>
  );
};
