import type { AppProps } from 'next/app';
import { IAuth } from '../@types/auth';
import ProtectedRoute from '../components/layout/protected';
import AuthProvider from '../context/authContext';
import '../styles/globals.css';

interface AppPropsModified extends AppProps {
  Component: React.ComponentType<any> & IAuth;
}

export default function App({ Component, pageProps }: AppPropsModified) {
  return (
    <AuthProvider>
      {Component.auth ? (
        <AuthProvider>
          <ProtectedRoute {...Component.auth}>
            <Component {...pageProps} />
          </ProtectedRoute>
        </AuthProvider>
      ) : (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      )}
    </AuthProvider>
  );
}
