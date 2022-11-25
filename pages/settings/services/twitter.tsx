import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import { Button, SettingsLayout } from 'components';
import { useIsOnboarded, useProtectedRoute } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { userSlice } from '@/selectors';
import { updateUserProfile } from '@/slices/user';
import { TwitterModal } from '@/components/TwitterModal';

type User = Record<'twitter' | 'address', string>;

const TwitterPage: NextPage = () => {
  const dispatch = useDispatch();
  useProtectedRoute();
  useIsOnboarded();
  const { address, profile } = useSelector(userSlice);

  const [user, setUser] = useState<User>({
    twitter: '',
    address: '',
  });

  // Prefill form with exisiting email
  useEffect(() => {
    if (address && !user.address) {
      setUser({
        address: profile?.eth_address as string,
        twitter: profile?.twitter as string,
      });
    }
  }, [address, user.address, profile?.eth_address, profile?.twitter]);

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
                  dispatch(updateUserProfile({ twitter }));
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
