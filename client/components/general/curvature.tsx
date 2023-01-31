import React from 'react';
import Image from 'next/image';
import { Box } from '../base';
import curvedline from '../../assets/bg2.png';
import curvedline2 from '../../assets/bg10.png';

export default function Curvature() {
  return (
    <Box>
      <div className="sm:hidden">
        <Image alt="" src={curvedline} className="w-full h-20" />
      </div>

      <div className="hidden sm:flex">
        <Image alt="" src={curvedline2} className="w-full h-20" />
      </div>
    </Box>
  );
}
