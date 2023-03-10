import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connectGithub } from 'utils/api';

import { useUser } from 'providers/react-query-auth';

const Page: NextPage = () => {
  const router = useRouter();
  const githubCode = router.query.code as string;
  const { data } = useUser();

  useEffect(() => {
    (async () => {
      if (!data?.eth_address) {
        return;
      }
      if (githubCode) {
        const { data, error } = await connectGithub(githubCode);

        if (error) {
          return alert('Error connecting to Github');
        }

        let originRoute = localStorage.getItem('gh-route'); //determine origin route
        if (originRoute) {
          router.push('/settings/services/github');
        } else {
          router.push(
            {
              pathname: '/onboarding',
              query: { username: data?.username },
            },
            '/onboarding'
          );
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubCode, data?.eth_address]);

  if (!githubCode) {
    return <div>No code</div>;
  }

  return <div>Redirecting you...</div>;
};

export default Page;
