import React from 'react';
import { Box, Typography } from '../base';
import { IPackageCategory } from '../../hooks/all-analytics';
import { IPackage } from '../../hooks/packages';
import { softwareDistribution } from '../../utils/analytics';
import Progress from '../base/progress';

export interface IPackageCategoriesProps {
  packages: IPackage[];
}

const PackageCategories: React.FC<IPackageCategoriesProps> = ({ packages }) => {
  const [distribution, setDistribution] = React.useState<IPackageCategory[]>(
    []
  );

  React.useEffect(() => {
    setDistribution(softwareDistribution(packages));
  }, [packages]);
  return (
    <Box
      gutterTop="xl"
      rounded="xl"
      shadow="lg"
      classname="bg-secondary-light  py-3 pt-6 px-3 md:pl-6">
      <Typography
        variant="h5"
        text="Software Distribution"
        color="primary"
        gutterBottom="xl"
      />
      <Box gutterTop="xl" classname="grid grid-cols-1 gap-y-6">
        {distribution.map((category: IPackageCategory) => {
          return (
            <Box key={category.label}>
              <Box
                gutterBottom="sm"
                classname="flex items-center justify-between">
                <Typography
                  text={category.label}
                  variant="subBody"
                  color="white"
                />
                <Typography
                  text={`${category.value}%`}
                  variant="caption"
                  color="primary"
                />
              </Box>
              <Progress percentage={category.value} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PackageCategories;
