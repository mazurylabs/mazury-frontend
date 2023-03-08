import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useClickOutside } from 'hooks';
import { CredentialsCount } from '@/types';
import storage from 'utils/storage';
import { STORED_USER } from 'config';

interface SearchProps {
  onSearch: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

interface DropdownProps {
  label: string;
  options?: CredentialsCount['credentials'];
  onSelect: (option?: string) => void;
  className?: string;
  selectedOption: string;
}

type View = 'search' | 'dropdown';

interface FilterSearchProps {
  search: SearchProps;
  dropdown: DropdownProps;
}

export const FilterSearch: React.FC<FilterSearchProps> = ({
  dropdown,
  search,
}) => {
  const defaultOption = `All ${dropdown.label.toLowerCase()}`;
  const storedUser = storage.getToken(STORED_USER);

  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const formRef = React.useRef<HTMLFormElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const [view, setView] = React.useState<View>('dropdown');
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  useClickOutside(containerRef, () => setToggleDropdown(false));
  useClickOutside(formRef, () => {
    setIsFocused(false);
    !search?.searchTerm && setView('dropdown');
  });

  const handleView = () => {
    setView('search');
    inputRef.current.focus();
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search?.onSearch();
  };

  const handleSelectOption = (option?: string) => {
    dropdown.onSelect(option);
    setToggleDropdown(false);
  };

  const formattedOptions = dropdown.options
    ? Object.keys(dropdown.options)
        .filter((item) => item !== 'total')
        .map((item) => ({
          title: item,
          value: (dropdown.options as any)[item],
        }))
    : [];

  return (
    <div className="relative h-12 w-full">
      <div
        className={clsx(
          'absolute inset-0 z-10 flex h-full grow items-center space-x-4',
          view === 'dropdown' ? 'visible' : 'invisible'
        )}
      >
        <div
          className={clsx('relative flex h-full', dropdown.className)}
          ref={containerRef}
        >
          <button
            type="button"
            className={clsx(
              'flex h-full items-center justify-between rounded-lg  bg-indigoGray-5 px-4 hover:bg-indigoGray-10',
              dropdown.className
            )}
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            <p className="font-sansMid text-sm font-medium text-indigoGray-50">
              {capitalize(dropdown.selectedOption) || defaultOption}
            </p>
            <SVG
              src="/icons/chevron-down.svg"
              height={24}
              width={24}
              className={clsx(toggleDropdown && 'rotate-180')}
            />
          </button>

          <AnimatePresence>
            {toggleDropdown && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-[100%] left-0 z-10 mt-1 h-[432px] w-[91.4vw] max-w-[672px] overflow-hidden rounded-lg bg-indigoGray-5 shadow-lg lg:mt-0 lg:w-full lg:max-w-[100%]"
              >
                <li
                  className={clsx(
                    'flex cursor-pointer items-center justify-between py-[13.5px] pl-4 pr-6 font-sans text-sm font-medium text-indigoGray-90 hover:bg-indigoGray-10',
                    !dropdown.selectedOption && 'text-indigo-600',
                    !dropdown.options?.total &&
                      'cursor-not-allowed text-indigoGray-30'
                  )}
                  onClick={() => handleSelectOption()}
                >
                  {defaultOption}
                  <span>{dropdown.options?.total || 0}</span>
                </li>
                {formattedOptions.map((option) => (
                  <li
                    key={option.title}
                    className={clsx(
                      'flex cursor-pointer items-center justify-between py-[13.5px] pl-4 pr-6 font-sans text-sm font-medium hover:bg-indigoGray-10',
                      dropdown.selectedOption === option.title
                        ? 'text-indigo-600'
                        : 'text-indigoGray-90',
                      !option.value && 'cursor-not-allowed text-indigoGray-30'
                    )}
                    onClick={() =>
                      option.value && handleSelectOption(option.title)
                    }
                  >
                    {capitalize(option.title)}
                    <span>{option.value}</span>
                  </li>
                ))}
                {!!storedUser && (
                  <Link
                    legacyBehavior
                    href={`/people/${router.query.address}/discover`}
                  >
                    <a className="sticky bottom-0 flex items-center space-x-[1px] bg-indigo-50 px-4 py-[13.5px]">
                      <p className="font-sans text-sm font-medium text-indigoGray-90">
                        Discover web3 credentials
                      </p>
                      <SVG
                        height={24}
                        width={24}
                        src="/icons/chevron-right.svg"
                        className="text-indigoGray-90"
                      />
                    </a>
                  </Link>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          aria-label="search"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigoGray-5"
          onClick={handleView}
        >
          <SVG src="/icons/search-black.svg" height={24} width={24} />
        </button>
      </div>

      <form
        ref={formRef}
        className={clsx(
          'absolute inset-0 flex flex h-full h-full w-full items-center rounded-lg bg-indigoGray-5 py-3 pl-[14px]',
          view === 'search' ? 'z-10 opacity-100' : 'z-[-1] opacity-0'
        )}
        onSubmit={handleSearch}
      >
        <div className="flex h-6 w-6">
          <SVG height={24} width={24} src={`/icons/search-black.svg`} />
        </div>

        <div className="ml-4 mr-10 grow font-sans  text-base font-medium">
          <input
            ref={inputRef}
            type="text"
            placeholder="Paradign CTF 2022, ETHAmsterdam 2022 Finalist Hacker..."
            aria-label="Search"
            className="block h-full w-full bg-transparent"
            value={search?.searchTerm}
            onChange={search?.onChange}
            onFocus={() => setIsFocused(true)}
            autoFocus={true}
          />
        </div>

        <div className="mr-2 h-8 w-8">
          {isFocused && (
            <button type="submit" className="border-none !p-0">
              <SVG
                height={32}
                width={32}
                src={`/icons/search-forward${
                  search?.searchTerm ? '' : '-inactive'
                }.svg`}
              />
              <span className="sr-only">Submit</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
