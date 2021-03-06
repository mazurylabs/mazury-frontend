import { AxiosError } from 'axios';
import { OnboardingFormDataType } from 'contexts';
import { Activity, APIResponse, ListResponse, Profile, Referral } from 'types';
import type { ScopedMutator } from 'swr/dist/types';
import { api } from '.';

export const getProfile: (
  address: string
) => Promise<APIResponse<Profile>> = async (address: string) => {
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

export const verifyEmail: (
  address: string,
  signature: string
) => Promise<APIResponse<string | null>> = async (address, signature) => {
  try {
    const res = await api.patch(
      `/profiles/${address}/send_verification_email/`,
      {},
      {
        headers: {
          'ETH-AUTH': signature,
        },
      }
    );

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
  avatarFile?: File | null,
  shouldRemoveAvi?: boolean
) => Promise<APIResponse> = async (
  address,
  signature,
  data,
  avatarFile,
  shouldRemoveAvi = false
) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      if (key === 'avatar') {
        continue;
      }
      // @ts-ignore
      formData.append(key, data[key]);
    }
    if (shouldRemoveAvi) {
      formData.append('avatar', '');
    }
    if (avatarFile) {
      formData.append('avatar', avatarFile, avatarFile?.name);
    }
    // @ts-expect-error passing in a boolean to formdata
    formData.append('onboarded', true);
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
    console.error(err);
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

export const createReferral: (
  receiverAddress: string,
  content: string,
  skills: string[],
  authorSignature: string,
  mutate?: ScopedMutator,
  authorAddress?: string
) => Promise<APIResponse<Referral>> = async (
  receiverAddress,
  content,
  skills,
  authorSignature,
  mutate,
  authorAddress
) => {
  try {
    const res = await api.post(
      '/referrals/',
      {
        receiver: receiverAddress,
        content,
        skills,
      },
      {
        headers: {
          'ETH-AUTH': authorSignature,
        },
      }
    );
    // Revalidate queries
    mutate?.(`/referrals?receiver=${receiverAddress}`);
    mutate?.(`/activity?user=${receiverAddress}`);
    mutate?.(`/referrals?author=${authorAddress}`);
    mutate?.(`/activity?user=${authorAddress}`);
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

export const verifyTweet: (
  tweetURL: string,
  signature: string
) => Promise<APIResponse> = async (tweetURL, signature) => {
  try {
    if (!tweetURL || !signature) {
      return {
        data: null,
        error: new Error('Missing tweetURL or signature'),
      };
    }
    const res = await api.post(
      `/auth/twitter?tweet_url=${tweetURL}`,
      {},
      {
        headers: {
          'ETH-AUTH': signature,
        },
      }
    );
    return {
      data: res.data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err,
    };
  }
};

export const connectGithub: (
  githubCode: string,
  signature: string
) => Promise<APIResponse> = async (githubCode, signature) => {
  try {
    if (!githubCode || !signature) {
      return {
        data: null,
        error: new Error('Missing githubCode or signature'),
      };
    }
    const res = await api.post(
      `/auth/github?github_code=${githubCode}`,
      {},
      {
        headers: {
          'ETH-AUTH': signature,
        },
      }
    );
    return {
      data: res.data,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: err,
    };
  }
};

export const isOnboarded: (
  address: string
) => Promise<APIResponse<boolean>> = async (address) => {
  try {
    const { data: profile } = await getProfile(address);
    return {
      data: !!profile?.onboarded,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};

export const isValid: (
  field: 'username' | 'email',
  value: string
) => Promise<
  APIResponse<{
    valid: boolean;
    type: string;
    value: string;
  } | null>
> = async (field, value) => {
  try {
    const res = await api.post(`/profiles/validate?type=${field}`, {
      value,
    });
    return {
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data,
    };
  }
};
