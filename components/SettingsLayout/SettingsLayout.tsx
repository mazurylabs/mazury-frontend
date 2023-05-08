import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import SVG from 'react-inlinesvg';
import { Toaster, toast } from 'react-hot-toast';

import { Button, Layout, Pill, Spinner } from 'components';
import { Toggle } from '../Toggle';
import { updateProfile } from 'utils/api';
import { useLogout, useUser } from 'providers/react-query-auth';

import {
  SettingsCardProps,
  SettingsLayoutProps,
  SettingsLinkProps,
} from './SettingsLayout.types';

const SettingsCard: React.FC<SettingsCardProps> = ({ title, links }) => {
  const nestedRoute = title.includes('services')
    ? title.split(' ')[1].toLowerCase()
    : title.toLowerCase();

  return (
    <div>
      <div className="rounded-lg border border-indigoGray-20">
        {links.map((link, index) => (
          <Link
            legacyBehavior
            href={`/settings/${nestedRoute}/${link.toLowerCase()}`}
            key={link + index}
          >
            <a className="flex justify-between p-4">
              <span className="font-sans text-sm font-semibold text-indigoGray-90">
                {link.split('-').join(' ')}
              </span>

              <SVG src="/icons/angle-right.svg" width={24} height={24} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ content }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const logout = useLogout();
  const router = useRouter();
  const { data: profile } = useUser();

  const handleOpenToOpportunities = async () => {
    const payload = {
      open_to_opportunities: !profile?.open_to_opportunities,
    };

    setLoading(true);

    const { error } = await updateProfile(
      profile?.eth_address as string,
      '',
      payload
    );

    if (!error) {
      queryClient.setQueryData(['authenticated-user'], (prev: any) => ({
        ...prev,
        ...payload,
      }));
    } else {
      Sentry.captureException(error);
      toast.error('Something went wrong');
    }

    setLoading(false);
  };

  const handleLogOut = () => {
    logout.mutate({}, { onSuccess: () => router.push('/') });
  };

  return (
    <Layout variant={'plain'}>
      <div className="mt-4 flex w-full bg-white px-4 md:sticky md:top-0 md:z-10 md:mt-20 md:px-0 md:pl-28">
        <div className="flex justify-center md:mt-4">
          <h1 className="font-demi text-4xl text-indigoGray-90 md:text-5xl">
            Settings
          </h1>
        </div>
      </div>
      <div className="flex grow flex-col px-4 pb-4 md:max-w-[700px] md:pl-28">
        {content ? (
          <div className="flex grow flex-col">
            <div className="mb-6 text-sm text-indigoGray-40 md:mb-3">
              <Link legacyBehavior href={'/settings'}>
                <a className="flex w-fit items-center font-sans">
                  <SVG src="/icons/back.svg" width="16px" height="16px" />

                  <span className="ml-3">SETTINGS</span>
                </a>
              </Link>
            </div>
            <div className="flex grow flex-col">{content}</div>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            <SettingsCard title="Account" links={['Ethereum-address']} />

            <Link legacyBehavior href="/pricing-plans">
              <a
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-indigoGray-20 p-4"
              >
                <div className="flex flex-col items-start">
                  <p className="font-sans text-sm font-semibold text-indigoGray-90">
                    {'profile?.plan'
                      ? 'Become a recruiter'
                      : 'Billing and team'}
                  </p>
                  <p className="font-sansMid text-xs font-medium text-indigo-600">
                    {!'profile?.plan'
                      ? 'Individual plan'
                      : 'Team plan – Coinbase team'}
                  </p>
                </div>
                <div>
                  <SVG src="/icons/angle-right.svg" width={24} height={24} />
                </div>
              </a>
            </Link>

            <div className="space-y-8 rounded-lg border border-indigoGray-20 p-4">
              <Link legacyBehavior href="/privacy-policy">
                <a className="flex w-full justify-between">
                  <p className="font-sans text-sm font-semibold text-indigoGray-90">
                    Privacy policy
                  </p>
                  <SVG src="/icons/angle-right.svg" width={24} height={24} />
                </a>
              </Link>

              <Link legacyBehavior href="/terms-of-service">
                <a className="flex w-full justify-between">
                  <p className="font-sans text-sm font-semibold text-indigoGray-90">
                    Terms of service
                  </p>
                  <SVG src="/icons/angle-right.svg" width={24} height={24} />
                </a>
              </Link>
            </div>

            <button
              type="button"
              className="flex w-full items-center space-x-3 rounded-lg border border-indigoGray-20 p-4"
              onClick={handleLogOut}
            >
              <div>
                <SVG src="/icons/sign-out.svg" width={16} height={16} />
              </div>
              <p className="font-sans text-sm font-semibold text-indigoGray-90">
                Sign out
              </p>
            </button>

            <div className="flex w-full items-center justify-between rounded-lg px-4">
              <div className="flex flex-col items-start">
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  Contact support
                </p>
                <p className="font-sansMid text-xs font-medium text-indigoGray-50">
                  You can contact us by writing to{' '}
                  <a
                    className="text-indigo-600"
                    href="mailto:support@mazury.xyz"
                  >
                    support@mazury.xyz
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </Layout>
  );
};
