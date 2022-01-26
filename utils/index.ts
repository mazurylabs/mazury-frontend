import axios from 'axios';

export const getTruncatedAddress = (
  address: string,
  length: number = 10
): string => {
  return `${address.slice(0, length)}...${address.slice(
    address.length - length
  )}`;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
