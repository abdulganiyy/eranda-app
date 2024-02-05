import axios, { AxiosResponse } from 'axios';
// import { UserType } from '@/types/index';
import { API_URL } from '@/utils/constant';
import axiosInstance from '../axiosInterceptor';


const conversationService = {
  create: async ({ queryKey }:any): Promise<any> => {
    // console.log(queryKey)
    const [_, data] = queryKey
    // console.log(data)
    const response: AxiosResponse<any> = await axiosInstance.post(`${API_URL}/conversation`,{participants:data?.participants});
    return response.data;
  },

  getUserConversations: async (): Promise<any> => {
    const response: AxiosResponse<any> = await axiosInstance.get(`${API_URL}/conversation/user`)
    return response.data;
  },
  sendMessage: async (data:any): Promise<any> => {
    // console.log(data)
    const response: AxiosResponse<any> = await axiosInstance.post(`${API_URL}/message`,data)
    return response.data;
  },
};

export default conversationService;
