import * as React from 'react';

import { api } from 'utils';
import { Post } from 'types';

export const usePosts = (address?: string) => {
  const [mirror, setMirror] = React.useState<Post[]>([]);
  const [gm, setGm] = React.useState<Post[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    const getMirrorPost = async () => {
      try {
        const { data } = await api.get(
          `${baseUrl}writing/mirror/${address || ''}`
        );
        setMirror(data);
      } catch (error) {
        console.log(error);
      }
    };

    getMirrorPost();
  }, [address]);

  React.useEffect(() => {
    const getGmPost = async () => {
      try {
        const { data } = await api.get(`${baseUrl}writing/gm/${address || ''}`);
        setGm(data);
      } catch (error) {
        console.log(error);
      }
    };

    getGmPost();
  }, [address]);

  return {
    posts: [...mirror, ...gm],
    // error: error,
  };
};
