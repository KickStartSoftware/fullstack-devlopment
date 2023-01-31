import axios, { AxiosHeaders } from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`,
});

apiClient.interceptors.request.use(
  async function (config: any) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = { ...config.headers };
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;
