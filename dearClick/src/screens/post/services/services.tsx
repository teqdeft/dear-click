import { API_URL } from '@env';
import api from '../../../helpers/axiosInstance';

export const fetchPost = async (): Promise<any> => {
  try {
    const { data } = await api.get(`${API_URL}/post/fetch-post`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const postLike = async (params: { postId: number }): Promise<any> => {
  try {
    const { data } = await api.post(`${API_URL}/post/${params.postId}/toggle-like`,);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
