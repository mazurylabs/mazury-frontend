import { OnboardingFormDataType } from 'contexts';
import { api } from '.';

export const getProfile = async (address: string) => {
  try {
    const res = await api.get(`/profiles/${address}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMessageToBeSigned = async (address: string) => {
  try {
    const res = await api.get(`/auth/message?address=${address}`);
    return res.data as string;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  address: string,
  signature: string,
  data: OnboardingFormDataType
) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      // @ts-ignore
      formData.append(key, data[key]);
    }
    const res = await api.patch(`/profiles/${address}/`, formData, {
      headers: {
        'ETH-AUTH': signature,
      },
    });
    console.log({ res });
  } catch (err) {
    throw err;
  }
};
