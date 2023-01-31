import React from 'react';
import { Box, Typography } from '../base';
import Curvature from './curvature';

const PageHeader: React.FC<{}> = () => {
  return (
    <Box>
      <Box classname="min-h-[5vh] px-4 md:px-8 pt-12"></Box>
      <Curvature />
    </Box>
  );
};

export default PageHeader;
