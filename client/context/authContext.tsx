import React from 'react';
import authClient from '../api/authClient';
import { signIn } from '../utils/sign-n';
import { useRouter } from 'next/router';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export interface IUSer {
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
}
export type TUSer = IUSer | null;
export interface IAuthResponse {
  token: string;
}

export interface IAuthContextProps {
  user: TUSer;
  loading: boolean;
  logout: (redirect?: boolean) => void;
  isAuthenticated: boolean;
  authenticate: () => Promise<void>;
  login: (email: string, password: string, cb?: any) => Promise<void>;
  signUp: (
    email: string,
    username: string,
    password: string,
    cb?: any
  ) => Promise<void>;
}
const AuthContext = React.createContext<null | IAuthContextProps>(null);

export interface IAuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const [callbackUrl, setCallbackUrl] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<TUSer>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const logout = (redirect = true) => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    redirect && router.push('/');
  };

  const login = async (email: string, password: string, cb?: any) => {
    try {
      setLoading(true);
      const response = await authClient.post('/login', {
        email,
        password,
      });
      if (cb) cb();
      const { token } = response.data as IAuthResponse;
      if (token) {
        localStorage.setItem('token', token);
      }
      setTimeout(() => {
        if (callbackUrl) {
          const url = callbackUrl;
          setCallbackUrl(null);
          return router.push(url);
        }
        router.push('/vault');
      }, 1500);
    } catch (error: any) {
      console.error(error);
      logout(false);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    username: string,
    password: string,
    cb?: any
  ) => {
    try {
      setLoading(true);
      const response = await authClient.post('/register', {
        email,
        username,
        password,
      });
      if (cb) cb();
      const { token } = response.data as IAuthResponse;
      if (token) {
        localStorage.setItem('token', token);
      }
      setTimeout(() => {
        router.push('/vault');
      }, 1500);
    } catch (e) {
      console.error(e);
      logout(false);
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await authClient.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error(error);
      logout();
      if (error.response.status === 401) {
        await signIn();
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const callbackUrl = router?.query?.callbackUrl;
    if (callbackUrl) {
      setCallbackUrl(callbackUrl as string);
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login,
        authenticate,
        signUp,
        loading,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);

export default AuthProvider;
