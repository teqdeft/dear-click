import axios from 'axios';

export const sendOtp = async statusFilter => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/user-active-inactive`,
      { statusFilter },
      {
        headers: {
          authorization: `Bearer ${provideToken()}`,
        },
      },
    );
    return data;
  } catch (error) {
    return error?.response?.data;
  }
};
