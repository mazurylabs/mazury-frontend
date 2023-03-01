import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Button, SettingsLayout } from 'components';
import { updateProfile } from 'utils/api';
import { useIsOnboarded, useProtectedRoute } from 'hooks';
import { useUser } from 'providers/react-query-auth';

type User = Record<'github' | 'address', string>;
type Steps = 'idle' | 'success';

const GithubPage: NextPage = () => {
  const queryClient = useQueryClient();
  useProtectedRoute();
  useIsOnboarded();

  const { data: profile } = useUser();

  const [user, setUser] = useState<User>({
    github: '',
    address: '',
  });

  // Prefill form with exisiting email
  useEffect(() => {
    if (profile?.eth_address && !user.address) {
      setUser({
        address: profile?.eth_address as string,
        github: profile?.github as string,
      });

      localStorage.removeItem('gh-route');
    }
  }, [user.address, profile?.eth_address, profile?.github]);

  const handleVerifyGithub = async () => {
    const githubPopupLink = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
    localStorage.setItem('gh-route', 'settings');
    window.open(githubPopupLink, '_blank');
  };

  const disconnectGithub = async () => {
    const { error } = await updateProfile(user.address, '', {
      github: '',
    });

    if (error) {
      return alert('Error disconnecting profile.');
    }
    queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
      ...prev,
      github: '',
    }));
    setUser((user) => {
      return { ...user, github: '' };
    });
  };

  const handleDisconnectGithub = async () => {
    disconnectGithub();
  };

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Github</h2>
          </div>

          <div className="mt-3 flex grow flex-col">
            <div className="flex grow flex-col">
              <div className="grow md:mb-8 md:grow-0">
                <div>
                  <p className="font-sans text-sm font-medium leading-[18px] text-indigoGray-60">
                    You can connect your Github account and have it show up as
                    one of your contacts. This way someone can see more info
                    about your projects.
                  </p>
                </div>
              </div>

              <Button
                className="w-full uppercase"
                size="large"
                onClick={
                  user.github ? handleDisconnectGithub : handleVerifyGithub
                }
              >
                {user.github ? 'DISCONNECT' : 'CONNECT'} GITHUB
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default GithubPage;
