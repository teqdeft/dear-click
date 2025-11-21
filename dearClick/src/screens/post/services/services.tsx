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

export const createPost = async (photo: { uri: string; type: string; fileName: string }) => {
  try {
    const formData = new FormData();
    formData.append('media', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    } as any);
    const { data } = await api.post(`${API_URL}/post/create-post`, formData,);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
