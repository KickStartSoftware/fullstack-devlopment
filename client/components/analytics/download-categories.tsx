import React, {useEffect} from 'react';
import { Box, Typography } from '../base';
import { ICategory, IDownload } from '../../hooks';
// import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { IPackageDownload } from '../../hooks/all-analytics';
import { mostDownloadedCategories } from '../../utils/analytics';

import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels"; 

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
  // 

    // chart
    useEffect(() => {
      const labels = ["6","5", "4", "3", "2", "1"];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "My First Dataset",
            data: [300,90, 50,50,20,20],
            borderWidth: 3,
            borderColor: '#0B2441',
            //   cutout: 50,
            backgroundColor: ["#3F6D98", "#4A7FB0", "#538EC3","#5B9BD5","#5C8BB7","#8BB1DD"],
            hoverOffset: 4,
          },
        ],
      };
  
      const config = {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      };
      const myChart = new Chart("myChart7", config);
  
      return () => {
        myChart.destroy();
      };
    });
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
          <div className="md:w-[500px] w-full mt-20 mx-auto my-auto h-full">
                <canvas id="myChart7"></canvas>
              </div>
        {/* <ResponsiveContainer width="100%" aspect={2}>
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
        </ResponsiveContainer> */}
      </Box>
    </Box>
  );
};

export default DownloadCategories;
