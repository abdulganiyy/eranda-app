import { AxiosResponse } from 'axios';
import axiosInstance from '@/axiosInterceptor';
import { API_URL } from '@/utils/constant';



interface UserData {
  // Define the structure of user data for registration
  email: string;
  password: string;
  firstName:string;
  lastName:string;
}


const userService = {
  getUser: async ({ queryKey }:any): Promise<any> => {
    // console.log(queryKey)
    const [_, id] = queryKey
    console.log(id)
    const response: AxiosResponse<any> = await axiosInstance.get(`${API_URL}/users/${id}`);
    return response.data;
  },
};

export default userService;
