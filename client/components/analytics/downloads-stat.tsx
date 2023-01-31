import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IDownload } from '../../hooks';
import { IPackageDownload } from '../../hooks/all-analytics';
import { mostDownloadedPackages } from '../../utils/analytics';
import { Box, Typography } from '../base';

const data = [
  {
    name: 'Page A',
    downloads: 240,
  },
  {
    name: 'Page B',
    downloads: 221,
  },
  {
    name: 'Page C',
    downloads: 290,
  },
  {
    name: 'Page D',
    downloads: 200,
  },
  {
    name: 'Page E',
    downloads: 181,
  },
  {
    name: 'Page F',
    downloads: 150,
  },
  {
    name: 'Page G',
    downloads: 210,
  },
  {
    name: 'Page G',
    downloads: 100,
  },
  {
    name: 'Page G',
    downloads: 215,
  },
  {
    name: 'Page G',
    downloads: 210,
  },
  {
    name: 'Page G',
    downloads: 210,
  },
  {
    name: 'Page G',
    downloads: 500,
  },
  {
    name: 'Page G',
    downloads: 260,
  },
  {
    name: 'Page G',
    downloads: 280,
  },
];

export interface IDownloadsStatProps {
  downloads: IDownload[];
}

const DownloadsStat: React.FC<IDownloadsStatProps> = ({ downloads }) => {
  const [downloadsData, setDownloadsData] = React.useState<IPackageDownload[]>(
    []
  );

  React.useEffect(() => {
    setDownloadsData(mostDownloadedPackages(downloads));
  }, [downloads]);

  return (
    <Box
      gutterTop="xl"
      rounded="xl"
      shadow="lg"
      classname="bg-secondary-light min-h-[400px] py-3 pt-6 px-3 md:pl-6">
      <Typography
        variant="h5"
        text="Most Downloaded Packages"
        color="primary"
        gutterBottom="md"
      />
      <Box>
        <ResponsiveContainer width={'100%'} aspect={3}>
          <BarChart
            width={500}
            height={300}
            data={downloadsData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}>
            <CartesianGrid width={0} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ stroke: '#08eaea', strokeWidth: 0.3 }}
            />
            <YAxis
              minTickGap={1}
              tick={{ stroke: '#08eaea', strokeWidth: 0.3 }}
            />
            <Tooltip cursor={false} />
            <Legend />
            <Bar
              dataKey="downloads"
              legendType="square"
              fill="#08eaea"
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DownloadsStat;
