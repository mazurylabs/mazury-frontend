import { SiweMessage } from 'siwe';

import { OnboardingFormDataType } from 'contexts';
import {
  Activity,
  APIResponse,
  Badge,
  ListResponse,
  Profile,
  Referral,
} from 'types';
import type { ScopedMutator } from 'swr/dist/types';
import { axios } from '../lib/axios';

export const getProfile: (
  address: string
) => Promise<APIResponse<Profile>> = async (address: string) => {
  try {
    const res = await axios.get(`/profiles/${address}`);
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

export const getBadges: (
  address: string,
  issuer: string
) => Promise<APIResponse<Profile>> = async (
  address: string,
  issuer: string
) => {
  try {
    const res = await axios.get(
      `badges/?owner=${address}&issuer=${issuer}&limit=4`
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

export const getBadgeById: (id: string) => Promise<APIResponse<Badge>> = async (
  id
) => {
  try {
    const res = await axios.get(`badges/${id}`);

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

export const requestConnection: (
  address: string
) => Promise<APIResponse<Badge>> = async (address) => {
  try {
    const res = await axios.post(
      `/connections/request/?eth_address=${address}`,
      {}
    );

    return {
      data: res.data,
      error: null,
    };
  } catch (error: any) {
    throw error;
  }
};

export const requestConnectionStatus: (
  address: string
) => Promise<APIResponse<Badge>> = async (address) => {
  try {
    const res = await axios.get(`/connections/check/?eth_address=${address}`);

    return {
      data: res.data,
      error: null,
    };
  } catch (error: any) {
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
    const res = await axios.get(`/auth/message?address=${address}`);
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

export const mintBadge: (
  badgeId: string
) => Promise<APIResponse<{ transaction_id: string }>> = async (badgeId) => {
  try {
    const res = await axios.patch(`/badges/${badgeId}/mintnft/`, {});

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

export const verifyEmail = async (address: string) => {
  try {
    const res = await axios.patch(
      `/profiles/${address}/send_verification_email/`,
      {}
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
  shouldRemoveAvi?: boolean,
  coverFile?: File | null
) => Promise<APIResponse> = async (
  address,
  signature,
  data,
  avatarFile,
  shouldRemoveAvi = false,
  coverFile
) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      if (key === 'avatar' || key === 'cover') {
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
    if (coverFile) {
      formData.append('cover', coverFile, coverFile?.name);
    }
    // @ts-expect-error passing in a boolean to formdata
    formData.append('onboarded', true);
    const { data: Profile } = await axios.patch(
      `/profiles/${address}/`,
      formData
    );

    return {
      data: Profile,
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
    const res = await axios.get(`/activity?user=${address}`);
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
    const res = await axios.post('/referrals/', {
      receiver: receiverAddress,
      content,
      skills,
    });
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

export const verifyTweet: (tweetURL: string) => Promise<APIResponse> = async (
  tweetURL
) => {
  try {
    if (!tweetURL) {
      return {
        data: null,
        error: new Error('Missing tweetURL or signature'),
      };
    }
    const res = await axios.post(`/auth/twitter?tweet_url=${tweetURL}`, {});
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
  githubCode: string
) => Promise<APIResponse> = async (githubCode) => {
  try {
    if (!githubCode) {
      return {
        data: null,
        error: new Error('Missing'),
      };
    }
    const res = await axios.post(`/auth/github?github_code=${githubCode}`, {});
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
    const res = await axios.post(`/profiles/validate?type=${field}`, {
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

export const getNonce = async (address: string) => {
  try {
    const res = await axios.get(`/auth/siwe/nonce?user=${address}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createSiweMessage = async (
  address: string,
  statement: string = 'Sign in with Ethereum to the app.'
): Promise<string> => {
  try {
    const domain = window.location.host;
    const origin = window.location.origin;
    const { nonce } = await getNonce(address);

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce,
    });

    return message.prepareMessage();
  } catch (error) {
    throw error;
  }
};

export async function getUserFn(address: string, isOwnProfile?: boolean) {
  const { data } = await axios.get<Profile>(
    `/profiles/${address}${!isOwnProfile ? '?action=display_profile_page' : ''}`
  );

  return data;
}
