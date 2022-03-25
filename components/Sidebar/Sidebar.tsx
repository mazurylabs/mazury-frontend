/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FC, useContext, useState } from 'react';
import { Avatar } from '..';
import { SidebarContext } from 'contexts';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Sidebar: FC = () => {
  const { isOpen } = useContext(SidebarContext);
  const { pathname } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Avatar
        src="/new-logo.svg"
        height="40px"
        width="40px"
        alt="Mazury logo"
        className={`${isOpen ? 'ml-4' : 'mx-auto'}`}
      />

      <Divider className="mt-8" />

      <menu
        className={`mt-12 flex flex-col text-xl font-bold ${
          isOpen ? 'items-start' : 'items-center'
        } h-[100%] ${isOpen && 'px-4'}`}
      >
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          expanded={isOpen}
          onClick={() => {}}
        />
        <SidebarItem
          href="/"
          label="Home"
          iconSrc="/icons/home.svg"
          isOpen={isOpen}
          active={pathname === '/'}
          className="mt-4"
        />

        <div className="mt-auto flex flex-col">
          {/* Email not verified alert */}
          {isOpen && (
            <div className="mx-auto mb-11 flex w-[168px] items-center justify-center">
              <img
                src="/icons/info.svg"
                width="16px"
                height="16px"
                alt="Info icon"
              />

              <p className="ml-3 text-sm font-medium text-indigoGray-90">
                <span className="font-bold">Your e-mail is not verified.</span>{' '}
                Check your mailbox or{' '}
                <a className="underline hover:cursor-pointer">click here</a> to
                resend the message.
              </p>
            </div>
          )}

          <Divider />

          <SidebarItem
            href="/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3"
            label="Profile"
            iconSrc="/profile-active.svg"
            isOpen={isOpen}
            active={pathname.startsWith('/people')}
            className="mt-8"
          />
          <SidebarItem
            href="/settings"
            label="Settings"
            iconSrc="/icons/sliders.svg"
            isOpen={isOpen}
            className="mb-4 mt-4"
            active={pathname.startsWith('/settings')}
          />
        </div>
      </menu>
    </>
  );
};

// ===================================================

/*
 * SidebarItem component
 */
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
        } p-3 text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-20 active:border-solid active:border-indigoGray-30 active:bg-indigoGray-10 active:text-indigoGray-80 ${
          active &&
          'border-solid border-indigoGray-30 bg-indigoGray-10 text-indigoGray-80'
        } ${className}`}
      >
        <img src={iconSrc} alt={`${label} icon`} /> {isOpen && label}
      </a>
    </Link>
  );
};

// ===============================================

/*
 * SearchInput component
 */

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
  expanded: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  onClick,
  expanded,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-xl bg-indigoGray-90 p-4 text-[14px] font-normal text-indigo-50 shadow-md`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/search.svg"
        alt="Search icon"
        className={`h-[16px] w-[16px] ${!expanded && 'hover:cursor-pointer'}`}
      />
      {expanded && (
        <input
          className="h-[16px] w-3/4 bg-transparent text-sm font-semibold outline-none"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
};

// ==================================

/*
 * Divider component
 */

interface DividerProps {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className }) => {
  return <hr className={`w-full border border-indigoGray-10 ${className}`} />;
};
