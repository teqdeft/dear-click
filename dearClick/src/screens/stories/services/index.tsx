import { API_URL } from '@env';
import api from '../../../helpers/axiosInstance';

export const createStory = async (photo: {
  uri: string;
  type: string;
  fileName: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('stories', {
      uri: photo.uri,
      type: photo.type,
      name: photo.fileName,
    } as any);
    const { data } = await api.post(`${API_URL}/user/upload-story`, formData);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const getStories = async (): Promise<any> => {
  try {
    const { data } = await api.get(`${API_URL}/user/get-following-stories`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
export const getmyStories = async (): Promise<any> => {
  try {
    const { data } = await api.get(`${API_URL}/user/get-my-stories`);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
