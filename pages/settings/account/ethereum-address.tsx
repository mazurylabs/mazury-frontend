import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';

import { Button, SettingsLayout } from 'components';
import { getProfile } from 'utils/api';
import { useProtectedRoute } from 'hooks';
import { useSelector } from 'react-redux';
import { userSlice } from '@/selectors';

type AddressArray = Record<'username' | 'address', string>[];

const EthAddressPage: NextPage = () => {
  useProtectedRoute();

  const { profile } = useSelector(userSlice);
  const [addresses, setAddresses] = useState<AddressArray>([]);

  // Prefill form with exisiting email
  useEffect(() => {
    if (profile) {
      let data = {
        username: profile?.username as string,
        address: profile?.eth_address as string,
      };

      setAddresses([data]);
    }
  }, [profile]);

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Ethereum addresses </h2>
          </div>

          <div className="mt-6 flex grow flex-col">
            <div className="flex grow flex-col justify-between md:mb-8 md:grow-0">
              <div className="grow">
                {addresses.map((data, index) => (
                  <div
                    key={data.username + index}
                    className="mb-8 flex items-center md:justify-between"
                  >
                    <div className="font-inter mr-10 max-w-[83%] shrink md:max-w-full">
                      <p className="font-bold">{data.username}</p>
                      <p className=" break-words text-xs font-medium leading-[18px] text-black-700">
                        {data.address}
                      </p>
                    </div>

                    {/* <div className="shrink-0">
                      <button type="button" aria-label="delete">
                        <Image
                          src="/icons/trash.svg"
                          alt="Back"
                          width="16px"
                          height="16px"
                        />
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>

              <Button className="w-full uppercase" size="large" disabled={true}>
                CONNECT NEW ADDRESS (COMING SOON)
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EthAddressPage;
