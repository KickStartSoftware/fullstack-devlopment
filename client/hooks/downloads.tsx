import React from 'react';
import { IPackage } from './packages';
import { useAuthContext } from '../context/authContext';
import generateZip from '../utils/generateZip';
import { ICollection } from './collections';

const useDownloads = () => {
  const authContext = useAuthContext();
  const [downloads, setDownloads] = React.useState<IPackage[]>([]);

  const togglePackage = (pkg: IPackage) => {
    setDownloads(downloads => {
      const newDownloads = [...downloads];
      const isIncluded = newDownloads.find(d => d._id === pkg._id);
      return isIncluded
        ? newDownloads.filter(d => d._id !== pkg._id)
        : [...newDownloads, pkg];
    });
  };

  const isSelected = (pkg: IPackage) => {
    return downloads.indexOf(pkg) !== -1;
  };

  const resetDownloads = () => {
    setDownloads([]);
  };

  const resetCollectionDownloads = (collection: ICollection) => {
    const newDownloads = [...downloads]
      .map(d => {
        const isIncluded = collection.packages.find(p => p._id === d._id);
        if (isIncluded) return undefined;
        return d;
      })
      .filter(d => d !== undefined) as IPackage[];
    collection.packages.forEach(pkg => {
      newDownloads.filter(d => d._id !== pkg._id);
    });

    setDownloads(newDownloads);
  };

  const postDownloads = () => {
    const name = authContext?.isAuthenticated ? 'my downloads' : 'public';
    generateZip(downloads, name, !authContext?.isAuthenticated, resetDownloads);
  };

  const postCollectionDownloads = (collection: ICollection) => {
    // pick only downloads that are among the collection packages
    const collectionDownloads = downloads.filter(pkg =>
      collection.packages.includes(pkg)
    );
    generateZip(
      collectionDownloads,
      collection.name,
      !authContext?.isAuthenticated,
      () => resetCollectionDownloads(collection)
    );
  };

  return {
    downloads,
    togglePackage,
    isSelected,
    postDownloads,
    postCollectionDownloads,
  };
};

export default useDownloads;
