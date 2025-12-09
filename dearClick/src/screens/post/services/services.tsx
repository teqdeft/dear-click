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
export const fetchSinlgePost = async (postId: number): Promise<any> => {
  try {
    const { data } = await api.get(
      `${API_URL}/post/get-single-story/${postId}`,
    );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const postLike = async (params: { postId: number }): Promise<any> => {
  try {
    const { data } = await api.post(
      `${API_URL}/post/${params.postId}/toggle-like`,
    );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const createPost = async (photo: {
  uri: string;
  type: string;
  fileName: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('media', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    } as any);
    const { data } = await api.post(`${API_URL}/post/create-post`, formData);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const createComment = async (postId: number, comment: string) => {
  try {
    const { data } = await api.post(
      `${API_URL}/post/${postId}/create-comment`,
      {
        comment,
      },
    );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getComments = async (postId: number) => {
  try {
    const { data } = await api.get(`${API_URL}/post/${postId}/get-comment`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const { data } = await api.delete(
      `${API_URL}/post/${commentId}/delete-comment`,
    );
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
