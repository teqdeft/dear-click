import { API_URL } from '@env';
import api from '../../../helpers/axiosInstance';

export const searchUsers = async (searchText: string): Promise<any> => {
  try {
    const { data } = await api.get(`${API_URL}/user/search?q=${searchText}`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const searchUsersPublicPosts = async (): Promise<any> => {
  try {
    const { data } = await api.get(`${API_URL}/user/show-search-all-posts`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getUserDetails = async (id: any): Promise<any> => {
  try {
    const { data } = await api.get(`${API_URL}/user/get-user-details/${id}`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const follows = async (userId: number) => {
  try {
    const { data } = await api.post(`${API_URL}/user/${userId}/follows`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
