import type { NextPage } from 'next';
import { IPublicLayoutProps } from '../components/layout/public';

export interface IAuth {
  auth: Omit<IPublicLayoutProps, 'children'>;
}

export type AuthPage = NextPage & IAuth;
