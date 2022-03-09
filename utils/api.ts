import { OnboardingFormDataType } from 'contexts';
import { APIResponse } from 'types';
import { api } from '.';

export const getProfile = async (address: string) => {
  try {
    const res = await api.get(`/profiles/${address}`);
    return {
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const getMessageToBeSigned: (
  address: string
) => Promise<APIResponse<string | null>> = async (address) => {
  try {
    const res = await api.get(`/auth/message?address=${address}`);
    return {
      data: res.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const updateProfile: (
  address: string,
  signature: string,
  data: OnboardingFormDataType
) => Promise<APIResponse> = async (address, signature, data) => {
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
    return {
      data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err,
    };
  }
};
