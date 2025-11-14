import api from "../../../helpers/axiosInstance";
import { API_URL } from "@env"

export interface UpdateProfileFormData {
  name?: string;
  userName?: string;
  bio?: string;
  website?: string;
  email?: string,
  phone?: string,
  gender?: string,
  date_of_birth?: string,
  account_type?: string,
  account_privacy?: string,
  language?: string,
  profilePic?: { uri: string; type: string; fileName: string };
}

export const updateProfile = async (formData: UpdateProfileFormData, action: string): Promise<any> => {
  try {
    const payload = { ...formData, action };
    const { data } = await api.put(`${API_URL}/auth/update-profile`, payload);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const updateProfilePicture = async (params: { photo: { uri: string; type: string; fileName: string }, action: string }) => {
  try {
    const formData = new FormData();
    formData.append('action', params.action)
    formData.append('profilePic', {
      uri: params.photo.uri,
      type: params.photo.type,
      name: params.photo.fileName,
    } as any);
    const { data } = await api.put(`${API_URL}/auth/update-profile`, formData,);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const updateSettings = async (formData: UpdateProfileFormData): Promise<any> => {
  try {
    const { data } = await api.put(`${API_URL}/auth/update-profile-settings`, formData);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};


