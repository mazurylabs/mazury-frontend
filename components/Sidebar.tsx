/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { Avatar } from '.';
import { InputWithIcon } from './SearchInput';

export const Sidebar: React.FC = () => {
  const [expand, setExpand] = React.useState(false);

  return (
    <motion.aside
      className={`fixed w-[75px] top-0 border h-screen py-10 px-5 shadow-inner flex flex-col z-20`}
      style={{
        background:
          'linear-gradient(184.64deg, #FFFFFF -5.13%, #E7E8E9 103.54%)',
      }}
      whileHover={{
        width: '266px',
      }}
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
    >
      <Avatar
        src='/waves.png'
        height='40px'
        width='40px'
        alt='Mazury logo'
        className='mx-auto'
      />
      <menu
        className={`flex flex-col gap-12 mt-12 text-xl font-bold ${
          expand ? 'items-start' : 'items-center'
        } h-[100%] ${expand && 'px-4'}`}
      >
        <InputWithIcon
          iconAlt='Search icon'
          iconSrc='/icons/search.svg'
          expanded={expand}
        />
        <Link href='/' passHref>
          <a className='flex items-center gap-4 text-sm font-medium text-indigoGray-50'>
            <img src='/icons/home.svg' alt='Home icon' /> {expand && 'Home'}
          </a>
        </Link>

        <Link
          href='/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3'
          passHref
        >
          <a className='flex items-center gap-4 text-sm font-medium text-indigoGray-50'>
            <img src='/profile-active.svg' alt='Profile icon' />{' '}
            {expand && 'Profile'}
          </a>
        </Link>

        <Link href='/' passHref>
          <a className='flex items-center gap-4 text-sm font-medium text-indigoGray-50 mt-auto pb-12'>
            <img src='/icons/sliders.svg' alt='Settings icon' />{' '}
            {expand && 'Settings'}
          </a>
        </Link>
      </menu>
    </motion.aside>
  );
};
