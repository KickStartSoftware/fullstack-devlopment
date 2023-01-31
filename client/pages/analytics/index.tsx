import React from 'react';
import { Box } from '../../components/base';
import useGetAllAnalytics from '../../hooks/all-analytics';
import { Content } from '../../components/general/content';
import PageHeader from '../../components/general/page-header';
import PublicLayout from '../../components/layout/public';
import StatCard from '../../components/analytics/stat-card';
import { BsPeople, BsCollection, BsCloudDownload } from 'react-icons/bs';
import { SiBmcsoftware } from 'react-icons/si';
import DownloadsStat from '../../components/analytics/downloads-stat';
import PackageCategories from '../../components/analytics/package-categories';
import DownloadCategories from '../../components/analytics/download-categories';

const Analytics = () => {
  const { allAnalyticsResponse, loading } = useGetAllAnalytics();

  return (
    <PublicLayout>
      <PageHeader />
      <Content>
        <Box classname="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:justify-between">
          <StatCard
            label="Users"
            value={allAnalyticsResponse.userCount}
            icon={<BsPeople className="h-[50px] w-[50px] text-primary-dark" />}
          />
          <StatCard
            label="Software"
            value={allAnalyticsResponse.packageCount}
            icon={
              <SiBmcsoftware className="h-[50px] w-[50px] text-primary-dark" />
            }
          />
          <StatCard
            label="Vault"
            value={allAnalyticsResponse.collectionCount}
            icon={
              <BsCollection className="h-[50px] w-[50px] text-primary-dark" />
            }
          />
          <StatCard
            label="Downloads"
            value={allAnalyticsResponse.downloadCount}
            icon={
              <BsCloudDownload className="h-[50px] w-[50px] text-primary-dark" />
            }
          />
        </Box>
        <DownloadsStat downloads={allAnalyticsResponse.downloads} />
        <Box classname="grid grid-cols-1 gap-8 md:grid-cols-[60%_37%]">
          <DownloadCategories
            downloads={allAnalyticsResponse.downloads}
            categories={allAnalyticsResponse.categories}
          />
          <PackageCategories packages={allAnalyticsResponse.packages} />
        </Box>
      </Content>
    </PublicLayout>
  );
};

export default Analytics;
