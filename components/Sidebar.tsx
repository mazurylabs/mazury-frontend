/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { FC, useContext } from 'react';
import { Avatar } from '.';
import { SidebarContext } from '../contexts';
import { InputWithIcon } from './SearchInput';

export const Sidebar: FC = () => {
  const { isOpen } = useContext(SidebarContext);

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
        className={`flex flex-col gap-12 mt-12 text-xl font-bold ${
          isOpen ? 'items-start' : 'items-center'
        } h-[100%] ${isOpen && 'px-4'}`}
      >
        <InputWithIcon
          iconAlt="Search icon"
          iconSrc="/icons/search.svg"
          expanded={isOpen}
        />
        <Link href="/" passHref>
          <a className="flex items-center gap-4 text-sm font-medium text-indigoGray-50">
            <img src="/icons/home.svg" alt="Home icon" /> {isOpen && 'Home'}
          </a>
        </Link>

        <Link
          href="/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3"
          passHref
        >
          <a className="flex items-center gap-4 text-sm font-medium text-indigoGray-50">
            <img src="/profile-active.svg" alt="Profile icon" />{' '}
            {isOpen && 'Profile'}
          </a>
        </Link>

        <Link href="/" passHref>
          <a className="flex items-center gap-4 text-sm font-medium text-indigoGray-50 mt-auto pb-12">
            <img src="/icons/sliders.svg" alt="Settings icon" />{' '}
            {isOpen && 'Settings'}
          </a>
        </Link>
      </menu>
    </>
  );
};
