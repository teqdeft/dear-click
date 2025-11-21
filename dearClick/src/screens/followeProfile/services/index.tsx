import { API_URL } from '@env';
import api from '../../../helpers/axiosInstance';

interface paramsType {
  id: number;
  media_type: string;
}
export const fetchFollowerProfile = async ({
  id,
  media_type,
}: paramsType): Promise<any> => {
  try {
    console.log('-=-=-=-=-', API_URL);
    const { data } = await api.get(
      `${API_URL}/user/fetch-follower-profile/${id}`,
      {
        params: { media_type },
      },
    );
    return data;
  } catch (error: any) {
    console.error('error:', error);
    return error?.response?.data;
  }
};
