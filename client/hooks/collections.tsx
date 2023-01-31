import React from 'react';
import { IPagination } from '.';
import apiClient from '../api/apiClient';
import { IPackage } from './packages';

export interface ICollection {
  _id: string;
  user: string;
  name: string;
  packages: IPackage[];
}

export interface CollectionResponse {
  pagination: IPagination;
  data: ICollection[];
}

const useGetCollections = () => {
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    limit: 10,
    total: 0,
    lastPage: 1,
  });
  const [collections, setCollections] = React.useState<ICollection[]>([]);

  const addNewcollection = (collection: ICollection) => {
    setCollections(prev => [...prev, collection]);
  };

  const removeCollection = (id: string) => {
    setCollections(prev => prev.filter(collection => collection._id !== id));
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get<CollectionResponse>('/collections');
        const data = res.data;
        setCollections(data.data);
      } catch (error) {
        console.error(error);
        setCollections([]);
        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          lastPage: 1,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    collections,
    loading,
    pagination,
    addNewcollection,
    removeCollection,
  };
};

export const useCreateCollection = () => {
  const [isCreating, setIsCreating] = React.useState(false);

  const createCollection = async (
    name: string,
    packageIds: string[],
    cb?: any
  ) => {
    try {
      if (!name || !packageIds)
        return alert('please provide a name and select packages');
      setIsCreating(true);
      const res = await apiClient.post<ICollection>('/collections', {
        name,
        packageIds,
      });
      if (typeof cb === 'function') {
        cb(res.data);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createCollection,
    isCreating,
  };
};

export const useDeleteCollection = () => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteCollection = async (id: string, cb?: any) => {
    try {
      if (!id) return alert('please provide a collection id');
      setIsDeleting(true);
      await apiClient.delete(`/collections/${id}`);
      cb && cb(id);
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteCollection,
    isDeleting,
  };
};

export default useGetCollections;
