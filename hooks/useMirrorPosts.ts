import { request } from 'graphql-request';
import useSWR from 'swr';
import { MirrorPost } from 'types';

export const useMirrorPosts = (address: string) => {
  const fetcher = (query: string) =>
    request('http://mirror-api-static.com/graphql', query);

  const { data, error } = useSWR<{
    entries: MirrorPost[];
  }>(
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

  return {
    posts: data?.entries,
    error,
    count: data?.entries.length,
  };
};
