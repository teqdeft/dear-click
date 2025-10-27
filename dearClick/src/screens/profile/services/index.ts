import { Alert } from "react-native";
import api from "../../../helpers/axiosInstance";
import {API_URL} from "@env"

export interface UpdateProfileFormData {
  name?: string;
  userName?: string;
  bio?: string;
  website?: string;
  email?: string,
  phone?: string,
  gender?: string,
  date_of_birth?:string,
  account_type?: string,
  account_privacy?: string,
  language?:string
}

export const updateProfile = async (formData: UpdateProfileFormData, action:string): Promise<any> => { 
  try {
       const payload = { ...formData, action };
    const { data } = await api.put(`${API_URL}/auth/update-profile`, payload);
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
    console.error("Update profile error:", error);
    return error?.response?.data;
  }
};

