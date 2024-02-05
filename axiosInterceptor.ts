import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL } from './utils/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig| any) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
