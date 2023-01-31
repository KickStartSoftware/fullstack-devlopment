import React from 'react';
import { PageLoader } from '../base';
import PublicLayout, { IPublicLayoutProps } from './public';
import { useAuthContext } from '../../context/authContext';

export interface IProtectedRouteProps extends IPublicLayoutProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.ComponentType<IProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const auth = useAuthContext();

  React.useEffect(() => {
    if (!auth) return;
    if (!auth.isAuthenticated) {
      auth.authenticate();
    }
  }, []);

  if (auth?.isAuthenticated && !auth.loading) {
    return <PublicLayout {...rest}>{children}</PublicLayout>;
  }

  return <PageLoader />;
};

export default ProtectedRoute;
