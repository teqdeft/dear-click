import axios from 'axios';
import { API_URL } from '@env';

interface paramsType {
  email?: string;
  phone?: string;
  otp?: string;
  name?: string;
  username?: string;
  profilePic?: any;
  password?: string;
  input?: string;
}

// enter email for verify
export const sendOtp = async ({ email, phone }: paramsType) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/send-otp`, {
      email,
      phone,
    });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// verify otp
export const verifyEmail = async ({ phone, email, otp }: paramsType) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/verify-email`, {
      email,
      phone,
      otp,
    });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// complete profile
export const completeProfile = async (params: {
  name: string;
  username: string;
  email: string;
  phone: string;
  photo: { uri: string; type: string; fileName: string };
}) => {
  try {
    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('username', params.username);
    formData.append('email', params.email);
    formData.append('phone', params.phone);

    formData.append('profilePic', {
      uri: params.photo.uri,
      type: params.photo.type,
      name: params.photo.fileName,
    } as any);

    const { data } = await axios.post(
      `${API_URL}/auth/complete-profile`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );

    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

//create password
export const createPassword = async ({
  phone,
  email,
  password,
}: paramsType) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/set-password`, {
      email,
      phone,
      password,
    });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

// sign in
export const SignIn = async ({ input, password }: paramsType) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, {
      input,
      password,
    });
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
