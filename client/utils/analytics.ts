import { ICategory, IDownload } from '../hooks';
import { IPackage } from '../hooks/packages';
import { IPackageCategory, IPackageDownload } from '../hooks/all-analytics';

export const mostDownloadedCategories = (
  downloads: IDownload[],
  categories: ICategory[]
): IPackageDownload[] => {
  if (downloads.length === 0) return [];

  const distribution = downloads.reduce((acc, download) => {
    const key = download.package.category as any;
    const total: number = acc[key] || 0;
    return { ...acc, [key]: total + 1 };
  }, {} as any);

  return Object.keys(distribution)
    .sort((a, b) => distribution[b] - distribution[a])
    .map(key => {
      return {
        name: categories.find(category => category._id === key)?.name!,
        downloads: distribution[key],
      };
    });
};

export const mostDownloadedPackages = (
  downloads: IDownload[]
): IPackageDownload[] => {
  if (downloads.length === 0) return [];

  const distribution = downloads.reduce((acc, curr) => {
    const key = curr.package.name;
    const total: number = acc[key] || 0;
    return { ...acc, [key]: total + 1 };
  }, {} as any);

  const reports = Object.keys(distribution)
    .sort((a, b) => distribution[b] - distribution[a])
    .map(key => {
      return {
        name: key,
        downloads: distribution[key],
      };
    });
  return reports.length > 15 ? reports.slice(0, 16) : reports;
};

export const softwareDistribution = (packages: IPackage[]): IPackageCategory[] => {
  if (packages.length === 0) return [];

  const distribution = new Map<string, number>();
  const totalPackages = packages.length;

  packages.forEach((pkg) => {
    const key = pkg?.category?.name;
    distribution.set(key, (distribution.get(key) || 0) + 1);
  });

  return Array.from(distribution.entries())
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([key, count]) => ({
      label: key,
      value: Math.floor((count / totalPackages) * 100),
    }));
};
