import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useClickOutside } from 'hooks';
import { CredentialsCount } from '@/types';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface DropdownProps {
  label: string;
  options?: CredentialsCount['credentials'];
  onSelect: (option?: string) => void;
  className?: string;
}

type View = 'search' | 'dropdown';

interface FilterSearchProps {
  search?: SearchProps;
  dropdown?: DropdownProps;
  defaultView?: View;
}

export const FilterSearch: React.FC<FilterSearchProps> = ({
  dropdown,
  search,
  defaultView = 'dropdown',
}) => {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null!);
  const formRef = React.useRef<HTMLFormElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const [view, setView] = React.useState<View>(() => defaultView);
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>(
    `All ${dropdown?.label.toLowerCase()}`
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  useClickOutside(containerRef, () => setToggleDropdown(false));
  useClickOutside(formRef, () => {
    setIsFocused(false);
    !searchTerm && setView(defaultView);
  });

  const handleView = () => {
    setView('search');
    inputRef.current.focus();
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search?.onSearch(searchTerm);
  };

  const defaultOption = `All ${dropdown?.label.toLowerCase()}`;

  const handleSelectOption = (option?: string) => {
    setSelectedOption(option || defaultOption);
    dropdown?.onSelect(option);
    setToggleDropdown(false);
  };

  const formattedOptions = dropdown?.options
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
          className={clsx('relative flex h-full', dropdown?.className)}
          ref={containerRef}
        >
          <button
            type="button"
            className={clsx(
              'flex h-full items-center justify-between rounded-lg  bg-indigoGray-5 px-4',
              dropdown?.className
            )}
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            <p className="font-sansMid text-sm font-medium text-indigoGray-50">
              {capitalize(selectedOption)}
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
                className="absolute top-[100%] left-0 z-10 h-[432px] w-full overflow-hidden rounded-lg bg-indigoGray-5"
              >
                <li
                  className={clsx(
                    'flex cursor-pointer items-center justify-between py-[13.5px] pl-4 pr-6 font-sans text-sm font-medium text-indigoGray-90',
                    selectedOption === defaultOption && 'text-indigo-600'
                  )}
                  onClick={() => handleSelectOption()}
                >
                  All {dropdown?.label.toLowerCase()}
                  <span>{dropdown?.options?.total || 0}</span>
                </li>
                {formattedOptions.map((option) => (
                  <li
                    key={option.title}
                    className={clsx(
                      'flex cursor-pointer items-center justify-between py-[13.5px] pl-4 pr-6 font-sans text-sm font-medium',
                      selectedOption === option.title
                        ? 'text-indigo-600'
                        : 'text-indigoGray-30'
                    )}
                    onClick={() => handleSelectOption(option.title)}
                  >
                    {capitalize(option.title)}
                    <span>{option.value}</span>
                  </li>
                ))}
                <Link href={`/people/${router.query.address}/discover`}>
                  <a className="sticky bottom-0 flex items-center space-x-[1px] bg-indigo-50 px-4 py-[13.5px]">
                    <p className="font-sans text-sm font-medium text-indigoGray-90">
                      Discover web3 credentials
                    </p>
                    <SVG
                      height={24}
                      width={24}
                      src="/icons/chevron-right-black.svg"
                    />
                  </a>
                </Link>
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
            className="hidden h-full w-full bg-transparent lg:block"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
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
                  searchTerm ? '' : '-inactive'
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
