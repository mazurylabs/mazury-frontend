import { OnboardingFormDataType } from 'contexts';
import { Activity, APIResponse, ListResponse } from 'types';
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
  data: OnboardingFormDataType,
  avatarFile?: File | null
) => Promise<APIResponse> = async (address, signature, data, avatarFile) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      if (key === 'avatar') {
        continue;
      }
      // @ts-ignore
      formData.append(key, data[key]);
    }
    if (avatarFile) {
      formData.append('avatar', avatarFile, avatarFile.name);
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

export const getActvity: (
  address?: string
) => Promise<APIResponse<ListResponse<Activity>>> = async (address) => {
  try {
    const res = await api.get(`/activity?user=${address}`);
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
