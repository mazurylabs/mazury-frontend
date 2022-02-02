import Link from 'next/link';
import React from 'react';
import { Avatar } from '.';
import { InputWithIcon } from './SearchInput';

export const Sidebar: React.FC = () => {
  const [searchExpanded, setSearchExpanded] = React.useState(false);

  return (
    <aside
      className={`sticky w-1/12 top-0 border h-screen py-10 px-5 shadow-inner`}
      style={{
        background:
          'linear-gradient(184.64deg, #FFFFFF -5.13%, #E7E8E9 103.54%)',
      }}
    >
      <Avatar
        src='/waves.png'
        height='40px'
        width='40px'
        alt='Mazury logo'
        className='mx-auto'
      />
      <menu className='flex flex-col gap-12 mt-12 text-xl font-bold items-center'>
        <InputWithIcon
          iconAlt='Search icon'
          iconSrc='/icons/search.svg'
          expanded={searchExpanded}
          onClick={() => setSearchExpanded(!searchExpanded)}
        />
        <Link href='/' passHref>
          <a>Home</a>
        </Link>
        <Link href='/search' passHref>
          <a>Search</a>
        </Link>
        <Link href='/people/0x' passHref>
          <a>Profile</a>
        </Link>
        <Link href='/settings' passHref>
          <a>Settings</a>
        </Link>
      </menu>
    </aside>
  );
};
