import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { skillsList } from 'utils';
import { ListResponse, MirrorPost } from '../types';
import { request } from 'graphql-request';

export const useMirror = (address: string) => {
  const fetcher = (query) => request('https://mirror-api.com/graphql', query);

  const { data, error } = useSWR(
    `{
        entries(projectAddress: \"${address}\") {
            title
            featuredImage {
                url
            }
            body
            author {
                address
            }
            digest
            originalDigest
            timestamp
            publishStatus
            publishedAtTimestamp
        }
    }`,
    fetcher
  );
  const [mirrorPosts, setMirrorPosts] = useState<MirrorPost[]>([]);

  useEffect(() => {
    setMirrorPosts(data?.entries);
  }, [data?.entries]);

  return {
    mirrorPosts,
    error,
  };
};
