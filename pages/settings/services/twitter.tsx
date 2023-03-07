import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Button, SettingsLayout } from 'components';
import { useIsOnboarded, useProtectedRoute } from 'hooks';
import { TwitterModal } from '@/components/TwitterModal';
import { useUser } from '@/providers/react-query-auth';

type User = Record<'twitter' | 'address', string>;

const TwitterPage: NextPage = () => {
  const queryClient = useQueryClient();
  useProtectedRoute();
  useIsOnboarded();
  const { data: profile } = useUser();

  const [user, setUser] = useState<User>({
    twitter: '',
    address: '',
  });

  // Prefill form with exisiting email
  useEffect(() => {
    if (profile?.eth_address && !user.address) {
      setUser({
        address: profile?.eth_address as string,
        twitter: profile?.twitter as string,
      });
    }
  }, [user.address, profile?.eth_address, profile?.twitter]);

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Twitter</h2>
          </div>

          <div className="mt-3 flex grow flex-col">
            <div className="flex grow flex-col">
              <div className="grow md:mb-8 md:grow-0">
                <div>
                  <p className="font-sans text-sm font-medium leading-[18px] text-indigoGray-60">
                    {user.twitter ? (
                      <>
                        You are logged in as{' '}
                        <span className="font-bold text-indigo-700">
                          {user.twitter}
                        </span>
                      </>
                    ) : (
                      `You can connect your Twitter account and have it show up as
                    one of your contacts. This way someone can reach you faster.`
                    )}
                  </p>
                </div>
              </div>

              <TwitterModal
                trigger={
                  <Button className="w-full uppercase" size="large">
                    {user.twitter ? 'DISCONNECT' : 'CONNECT'} TWITTER
                  </Button>
                }
                isDisconnecting={!!user.twitter}
                handleSubmit={(twitter) => {
                  setUser((user) => {
                    return { ...user, twitter };
                  });
                  queryClient.setQueryData(
                    ['authenticated-user'],
                    (prev: any) => ({
                      ...prev,
                      twitter,
                    })
                  );
                }}
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default TwitterPage;
