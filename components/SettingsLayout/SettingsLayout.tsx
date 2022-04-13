import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button, Layout, Sidebar, Pill } from 'components';
import {
  SettingsCardProps,
  SettingsLayoutProps,
  SettingsLinkProps,
} from './SettingsLayout.types';

const SettingsCard: FC<SettingsCardProps> = ({ title, links }) => {
  const nestedRoute = title.includes('services')
    ? title.split(' ')[1].toLowerCase()
    : title.toLowerCase();

  return (
    <div className="mb-8 md:mb-16">
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
              <span>{link.split('-').join(' ')}</span>

              <Image
                src="/icons/arrow-right.svg"
                width="7.78px"
                height="12.73px"
                alt="back"
              />
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
                <a className="flex pl-6">
                  <Image
                    src={'/icons/list-disc.svg'}
                    width="4px"
                    height="4px"
                    alt="list disc"
                  />

                  <span className="ml-5">{link}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const SettingsLayout: FC<SettingsLayoutProps> = ({ content }) => {
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
              links={['Username', 'Email', 'Eth-address']}
            />

            <SettingsLink
              title="Services"
              links={['Twitter', 'Github', 'Discord']}
            />
          </div>
        </div>
      }
      innerRightContent={
        <div className="flex grow flex-col md:max-w-[31.25rem]">
          {content ? (
            <div className="flex grow flex-col">
              <div className="mb-6 text-sm text-indigoGray-40 md:mb-3">
                <Link href={'/settings'}>
                  <a className="font-inter flex w-fit items-center">
                    <Image
                      src="/icons/back.svg"
                      alt="Back"
                      width="16px"
                      height="16px"
                    />

                    <span className="ml-3">SETTINGS</span>
                  </a>
                </Link>
              </div>
              <div className="flex grow flex-col">{content}</div>
            </div>
          ) : (
            <div>
              <SettingsCard
                title="Account"
                links={['Username', 'Email', 'Eth-address']}
              />

              <SettingsCard
                title="Connected services"
                links={['Twitter', 'Github', 'Discord']}
              />

              <div>
                <h2 className="font-demi text-xl text-indigoGray-90 md:text-3xl">
                  Delete account
                </h2>
                <p className="my-3">
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
        </div>
      }
    />
  );
};
