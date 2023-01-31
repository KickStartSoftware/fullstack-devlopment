import React from 'react';
import { IPackage } from './packages';
import { ICategory, IDownload } from '.';
import apiClient from '../api/apiClient';

// packages-categories
export interface IPackageCategory {
  label: string;
  value: number;
}

// package-downloads
export interface IPackageDownload {
  name: string;
  downloads: number;
}

export interface AllAnalyticsResponse {
  userCount: number;
  packageCount: number;
  downloadCount: number;
  collectionCount: number;
  packages: IPackage[];
  downloads: IDownload[];
  categories: ICategory[];
}

const defaultAllAnalyticsResponse: AllAnalyticsResponse = {
  userCount: 0,
  packageCount: 0,
  downloadCount: 0,
  collectionCount: 0,
  packages: [],
  downloads: [],
  categories: [],
};

const useGetAllAnalytics = () => {
  const [loading, setLoading] = React.useState(true);
  const [allAnalyticsResponse, setAllAnalyticsResponse] =
    React.useState<AllAnalyticsResponse>(defaultAllAnalyticsResponse);

  React.useEffect(() => {
    const fetchAllAnalytics = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/analytics/all');
        const data = response.data as AllAnalyticsResponse;
        setAllAnalyticsResponse(data);
      } catch (error) {
        setAllAnalyticsResponse(defaultAllAnalyticsResponse);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAnalytics();
  }, []);

  return {
    loading,
    allAnalyticsResponse,
  };
};

export default useGetAllAnalytics;
