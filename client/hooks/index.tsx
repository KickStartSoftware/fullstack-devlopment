import { IUSer } from '../context/authContext';
import { IPackage } from './packages';

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  lastPage: number;
}

export interface IOption {
  value: string;
  label: string;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface IDownload {
  _id: string;
  user: IUSer;
  package: IPackage;
}
