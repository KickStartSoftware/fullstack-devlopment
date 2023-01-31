import React from 'react';
import { Box, Typography } from '../base';
import { ICategory, IDownload } from '../../hooks';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { IPackageDownload } from '../../hooks/all-analytics';
import { mostDownloadedCategories } from '../../utils/analytics';

export interface IDownloadCategoriesProps {
  downloads: IDownload[];
  categories: ICategory[];
}

const DownloadCategories: React.FC<IDownloadCategoriesProps> = ({
  downloads,
  categories,
}) => {
  const [data, setData] = React.useState<IPackageDownload[]>([]);

  React.useEffect(() => {
    setData(mostDownloadedCategories(downloads, categories));
  }, [downloads, categories]);
  return (
    <Box
      gutterTop="xl"
      rounded="xl"
      shadow="lg"
      classname="bg-secondary-light py-3 pt-6 px-3 md:pl-6">
      <Typography
        variant="h5"
        text="Most Downloaded Categories"
        color="primary"
        gutterBottom="xl"
      />
      <Box classname="pt-6">
        <ResponsiveContainer width="100%" aspect={2}>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="downloads"
              isAnimationActive
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={140}
              fill="#08eaea"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DownloadCategories;
