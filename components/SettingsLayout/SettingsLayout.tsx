import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { Toaster } from 'react-hot-toast';

import { Layout } from 'components';
import { useLogout, useUser } from 'providers/react-query-auth';

import { SettingsCardProps, SettingsLayoutProps } from './SettingsLayout.types';

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
  const logout = useLogout();
  const router = useRouter();
  const { data: profile } = useUser();

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
            {profile?.is_recruiter && (
              <Link
                href="/pricing"
                className="py-4 px-8 rounded-md border border-indigoGray-20 flex flex-col items-center space-y-2"
              >
                <div className="flex space-x-2 items-center text-green-600">
                  <SVG src="/icons/arrow-up-circle.svg" className="h-6 w-6" />
                  <p>Upgrade your account to pro</p>
                </div>
                <p className="font-sans text-sm font-light text-indigoGray-50 text-center">
                  Your trial has ended. To continue using recruiter features,
                  please upgrade your account
                </p>
              </Link>
            )}

            <SettingsCard title="Account" links={['Ethereum-address']} />

            <Link
              className="flex w-full items-center justify-between rounded-lg border border-indigoGray-20 p-4"
              href={!profile?.is_recruiter ? '/pricing' : '/billing'}
            >
              <div className="flex flex-col items-start">
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  {!profile?.is_recruiter
                    ? 'Become a recruiter'
                    : 'Billing and team'}
                </p>
                {profile?.is_recruiter && (
                  <p className="font-sansMid text-xs font-medium text-indigo-600">
                    {profile?.team_membership.team_data.plan === 'individual'
                      ? 'Individual plan'
                      : `Team plan – ${profile?.team_membership.team_data.name}`}
                  </p>
                )}
              </div>
              <div>
                <SVG src="/icons/angle-right.svg" width={24} height={24} />
              </div>
            </Link>

            <div className="space-y-8 rounded-lg border border-indigoGray-20 p-4">
              <Link
                className="flex w-full justify-between"
                href="/privacy-policy"
              >
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  Privacy policy
                </p>
                <SVG src="/icons/angle-right.svg" width={24} height={24} />
              </Link>

              <Link
                className="flex w-full justify-between"
                href="/terms-of-service"
              >
                <p className="font-sans text-sm font-semibold text-indigoGray-90">
                  Terms of service
                </p>
                <SVG src="/icons/angle-right.svg" width={24} height={24} />
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
