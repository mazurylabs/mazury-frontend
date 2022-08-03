import { axios } from '@/lib/axios';
import * as React from 'react';
import { SWRConfig } from 'swr';

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const SwrProvider: React.FC = ({ children }) => (
  <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
);
