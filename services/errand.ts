import axios, { AxiosResponse } from 'axios';
// import { UserType } from '@/types/index';
import { API_URL } from '@/utils/constant';
import axiosInstance from '../axiosInterceptor';


const errandService = {
  add: async (errandData:any): Promise<any> => {
    const response: AxiosResponse<any> = await axiosInstance.post(`${API_URL}/errand`, errandData);
    return response.data;
  },

  getErrands: async (): Promise<any> => {
    const response: AxiosResponse<any> = await axiosInstance.get(`${API_URL}/errand`)
    return response.data;
  },
};

export default errandService;
