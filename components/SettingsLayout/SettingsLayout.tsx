import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SVG from 'react-inlinesvg';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster, toast } from 'react-hot-toast';
import { disconnect } from '@wagmi/core';

import { Button, Layout, Sidebar, Pill, Spinner } from 'components';
import {
  SettingsCardProps,
  SettingsLayoutProps,
  SettingsLinkProps,
} from './SettingsLayout.types';
import { Toggle } from '../Toggle';
import { userSlice } from '@/selectors';
import { updateProfile } from '@/utils/api';
import { logout, updateUserProfile } from '@/slices/user';

const SettingsCard: React.FC<SettingsCardProps> = ({ title, links }) => {
  const nestedRoute = title.includes('services')
    ? title.split(' ')[1].toLowerCase()
    : title.toLowerCase();

  return (
    <div>
      <div className="mb-3">
        <h2 className="font-demi text-xl text-indigoGray-90 md:text-3xl">
          {title}
        </h2>
      </div>

      <div className="rounded-lg border border-indigoGray-20">
        {links.map((link, index) => (
          <Link
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

const SettingsLink = ({ title, links }: SettingsLinkProps) => {
  const { query, asPath, push } = useRouter();
  const routeArray = asPath.split('/');

  const isActive = links.find((link) => routeArray[3] === link.toLowerCase());
  const activeRoute = !query.route ? 'Account' : query.route;

  const handlePill = () => {
    push({ pathname: '/settings', query: { route: title } }, '/settings', {
      scroll: false,
    });
    title === 'Services' && window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <div className="mb-3">
      <Pill
        label={title}
        color="indigo"
        onClick={handlePill}
        active={
          routeArray.length === 2
            ? activeRoute === title
            : routeArray[2] === title.toLowerCase()
        }
        isNav={true}
      />

      <div className={` ${isActive ? 'h-fit' : 'h-0'} overflow-hidden`}>
        <ul className="list-disc">
          {links.map((link, index) => (
            <li
              key={link + index}
              className={`my-2.5 font-sans text-sm ${
                isActive === link
                  ? 'font-bold text-indigo-700'
                  : 'text-indigoGray-60'
              }`}
            >
              <Link
                href={`/settings/${title.toLowerCase()}/${link.toLowerCase()}`}
                as={`/settings/${title.toLowerCase()}/${link.toLowerCase()}`}
              >
                <a className="flex items-center pl-6">
                  <SVG src={'/icons/list-disc.svg'} width="4px" height="4px" />

                  <span className="ml-5">{link.split('-').join(' ')}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ content }) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile } = useSelector(userSlice);

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
      dispatch(updateUserProfile(payload));
    } else {
      toast.error('Something went wrong');
    }

    setLoading(false);
  };

  const handleLogOut = async () => {
    await disconnect();
    router.push('/');
    dispatch(logout());
  };

  return (
    <Layout
      headerContent={
        <div className="md: z-10 mt-4 flex w-full justify-start bg-white px-4 md:sticky md:top-0 md:mt-20 md:px-0">
          <div className="flex justify-center md:mt-4 md:w-3/12">
            <h1 className="font-demi text-4xl text-indigoGray-90 md:text-5xl">
              Settings
            </h1>
          </div>
        </div>
      }
      sidebarContent={<Sidebar />}
      innerLeftContent={
        <div className="flex justify-center">
          <div>
            <SettingsLink
              title="Account"
              links={['Username', 'Email', 'Ethereum-address', 'Profile-type']}
            />

            <SettingsLink
              title="Services"
              links={['Twitter', 'Github', 'Discord']}
            />
          </div>
        </div>
      }
      innerRightContent={
        <div className="flex grow flex-col pb-4 md:max-w-[31.25rem]">
          {content ? (
            <div className="flex grow flex-col">
              <div className="mb-6 text-sm text-indigoGray-40 md:mb-3">
                <Link href={'/settings'}>
                  <a className="flex w-fit items-center font-sans">
                    <SVG src="/icons/back.svg" width="16px" height="16px" />

                    <span className="ml-3">SETTINGS</span>
                  </a>
                </Link>
              </div>
              <div className="flex grow flex-col">{content}</div>
            </div>
          ) : (
            <div className="space-y-8 pb-4">
              <SettingsCard
                title="Account"
                links={['Username', 'Email', 'Ethereum-address']}
              />

              <button
                type="button"
                className="flex w-full items-center space-x-2"
                onClick={handleOpenToOpportunities}
              >
                <div className="flex grow items-center justify-between rounded-lg border border-indigoGray-20 p-4">
                  <div className="flex flex-col items-start">
                    <p className="font-sans text-sm font-semibold text-indigoGray-90">
                      Open to new opportunities
                    </p>
                    <p className="font-sansMid text-xs font-medium text-indigoGray-50">
                      Recruiters will be able to send you project proposals
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4">
                      {loading && <Spinner size={16} />}
                    </div>

                    <Toggle
                      isToggled={!!profile?.open_to_opportunities}
                      onToggle={() => {}}
                    />
                  </div>
                </div>
              </button>

              <Link href="/settings/account/profile-type">
                <a
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-indigoGray-20 p-4"
                >
                  <div className="flex flex-col items-start">
                    <p className="font-sans text-sm font-semibold text-indigoGray-90">
                      Profile type
                    </p>
                    <p className="font-sansMid text-xs font-medium text-indigo-600">
                      {profile?.is_recruiter ? 'Recruiter' : 'Talent'}
                    </p>
                  </div>
                  <div>
                    <SVG src="/icons/angle-right.svg" width={24} height={24} />
                  </div>
                </a>
              </Link>

              <SettingsCard
                title="Connected services"
                links={['Twitter', 'Github', 'Discord']}
              />

              <div className="space-y-8 rounded-lg border border-indigoGray-20 p-4">
                <Link href="/privacy-policy">
                  <a className="flex w-full justify-between">
                    <p className="font-sans text-sm font-semibold text-indigoGray-90">
                      Privacy policy
                    </p>
                    <SVG src="/icons/angle-right.svg" width={24} height={24} />
                  </a>
                </Link>

                <Link href="/terms-of-service">
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

              <div>
                <h2 className="font-demi text-xl text-indigoGray-90 md:text-3xl">
                  Delete account
                </h2>
                <p className="my-3 font-sansMid font-medium text-indigoGray-60">
                  Deleting your account means we delete all the information you
                  provided after signing up. We cannot delete other information
                  since it is on the blockchain.
                </p>
                <Button className="w-full bg-red-600 md:w-fit" size="large">
                  DELETE ACCOUNT
                </Button>
              </div>
            </div>
          )}
          <Toaster />
        </div>
      }
    />
  );
};
