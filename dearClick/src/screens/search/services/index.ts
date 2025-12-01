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
