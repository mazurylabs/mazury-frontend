/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import { Avatar } from '..';
import { SidebarContext } from 'contexts';
import { InputWithIcon } from '../SearchInput';
import { useRouter } from 'next/router';

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  href: string;
  isOpen: boolean;
  className?: string;
  active?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  iconSrc,
  href,
  isOpen,
  className,
  active = false,
}) => {
  return (
    <Link href={href} passHref>
      <a
        className={`flex h-[40px] ${
          isOpen && 'w-full'
        } items-center gap-4 rounded-md border ${
          !active && 'border-hidden'
        } p-3 text-sm font-medium text-indigoGray-50 hover:bg-indigoGray-20 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80 ${
          active &&
          'border-solid border-indigoGray-30 bg-indigoGray-10 text-indigoGray-80'
        } ${className}`}
      >
        <img src={iconSrc} alt={`${label} icon`} /> {isOpen && label}
      </a>
    </Link>
  );
};

export const Sidebar: FC = () => {
  const { isOpen } = useContext(SidebarContext);
  const { pathname } = useRouter();

  return (
    <>
      <Avatar
        src="/waves.png"
        height="40px"
        width="40px"
        alt="Mazury logo"
        className="mx-auto"
      />
      <menu
        className={`mt-12 flex flex-col gap-12 text-xl font-bold ${
          isOpen ? 'items-start' : 'items-center'
        } h-[100%] ${isOpen && 'px-4'}`}
      >
        <InputWithIcon
          iconAlt="Search icon"
          iconSrc="/icons/search.svg"
          expanded={isOpen}
        />
        <SidebarItem
          href="/"
          label="Home"
          iconSrc="/icons/home.svg"
          isOpen={isOpen}
          active={pathname === '/'}
        />
        <SidebarItem
          href="/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3"
          label="Profile"
          iconSrc="/profile-active.svg"
          isOpen={isOpen}
          active={pathname.startsWith('/people')}
        />

        <SidebarItem
          href="/settings"
          label="Settings"
          iconSrc="/icons/sliders.svg"
          isOpen={isOpen}
          className="mt-auto mb-12"
          active={pathname.startsWith('/settings')}
        />
      </menu>
    </>
  );
};
