import React from 'react';
import apiClient from '../api/apiClient';

export interface IPackage {
  category: { _id: string; name: string };
  createdAt: string;
  iconUrl: null | string;
  name: string;
  numberOfDownloads: number;
  updatedAt: string;
  win32url: string;
  win64url: string;
  _id: string;
}

export const categorizePackages = (packages: IPackage[]) => {
  if (packages.length === 0) return [];

  // group packages by category_id
  return packages.reduce((acc, p) => {
    const category = p.category;
    if (category) {
      const key = category.name;
      return {
        ...acc,
        [key]: [...(acc[key] || []), p],
      };
    }
    return acc;
  }, {} as any);
};

export interface PackagesResponse {
  data: IPackage[];
  total: number;
}

const useGetPackages = () => {
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  const [packages, setPackages] = React.useState<IPackage[]>([]);

  React.useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/packages');
        const data = response.data as PackagesResponse;
        setPackages(data.data);
        setTotal(data.total);
      } catch (error) {
        console.log(error);
        setPackages([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return {
    total,
    loading,
    packages,
  };
};

export default useGetPackages;
