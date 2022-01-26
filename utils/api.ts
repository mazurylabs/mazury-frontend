import { api } from '.';

export const getProfile = async (address: string) => {
  try {
    const res = await api.get(`/profiles/${address}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
