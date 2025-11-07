import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '@env';
import { TokenProvider } from './TokenProvider';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await TokenProvider();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const isFormData = config.data instanceof FormData;

    config.headers['Content-Type'] = isFormData
      ? 'multipart/form-data'
      : 'application/json';

    config.headers['Cache-Control'] = 'no-cache';
    config.headers.Pragma = 'no-cache';

    return config;
  },
  error => Promise.reject(error),
);

export default api;
