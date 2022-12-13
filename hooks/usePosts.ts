import { axios } from 'lib/axios';
import * as React from 'react';

import { Post } from 'types';

export const usePosts = (address?: string) => {
  const [mirror, setMirror] = React.useState<Post[]>([]);
  const [gm, setGm] = React.useState<Post[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    const getMirrorPost = async () => {
      try {
        if (address) {
          const { data } = await axios.get(`/writing/mirror/${address}`);
          setMirror(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMirrorPost();
  }, [address]);

  React.useEffect(() => {
    const getGmPost = async () => {
      try {
        if (address) {
          const { data } = await axios.get(`/writing/gm/${address}`);
          setGm(data);
        }
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
