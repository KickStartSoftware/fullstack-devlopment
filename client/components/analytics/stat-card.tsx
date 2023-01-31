import React from 'react';
import { Box, Typography } from '../base';

export interface IStatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<IStatCardProps> = ({ label, value, icon }) => {
  return (
    <Box
      rounded="xl"
      shadow="lg"
      classname="bg-secondary-light min-h-[120px] lg:min-h-[160px] py-3 px-3 md:pl-6 flex gap-x-8 items-center">
      {icon}
      <Box>
        <Typography
          variant="h1"
          text={value}
          color="primary"
          gutterBottom="md"
        />
        <Typography variant="h4" text={label} color="white" />
      </Box>
    </Box>
  );
};

export default StatCard;
