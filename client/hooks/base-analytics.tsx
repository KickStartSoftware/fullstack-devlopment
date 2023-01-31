import React from 'react';
import apiClient from '../api/apiClient';

export interface BaseAnalyticsResponse {
  users: number;
  packages: number;
  downloads: number;
  collections: number;
}

const defaultBaseAnalyticsResponse: BaseAnalyticsResponse = {
  users: 0,
  downloads: 0,
  packages: 0,
  collections: 0,
};

const useBaseAnalytics = () => {
  const [loading, setLoading] = React.useState(true);
  const [baseAnalytics, setBaseAnalytics] =
    React.useState<BaseAnalyticsResponse>(defaultBaseAnalyticsResponse);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/analytics');
        const data = response.data as BaseAnalyticsResponse;
        setBaseAnalytics(data);
      } catch (error) {
        console.log(error);
        setBaseAnalytics(defaultBaseAnalyticsResponse);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return {
    baseAnalytics,
    loading,
  };
};

export default useBaseAnalytics;
