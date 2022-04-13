import { OnboardingFormDataType } from 'contexts';
import { Activity, APIResponse, ListResponse, Profile, Referral } from 'types';
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
  authorSignature: string
) => Promise<APIResponse<Referral>> = async (
  receiverAddress,
  content,
  skills,
  authorSignature
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
