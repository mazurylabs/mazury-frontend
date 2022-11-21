import { userSlice } from '@/selectors';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connectGithub } from 'utils/api';

const Page: NextPage = () => {
  const router = useRouter();
  const githubCode = router.query.code as string;
  const { address } = useSelector(userSlice);

  useEffect(() => {
    (async () => {
      if (!address) {
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
  }, [githubCode, address]);

  if (!githubCode) {
    return <div>No code</div>;
  }

  return <div>Redirecting you...</div>;
};

export default Page;
