import { API_URL } from "@env";
import api from "../../../helpers/axiosInstance";


export const fetchPost = async (): Promise<any> => { 
  try {
    const { data } = await api.get(`${API_URL}/post/fetch-post`);
    return data;
  } catch (error: any) {
    console.error("Update profile error:",error);
    return error?.response?.data;
  }
};