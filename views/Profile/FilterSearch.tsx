import { useClickOutside } from '@/hooks';
import clsx from 'clsx';
import * as React from 'react';
import SVG from 'react-inlinesvg';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
}

type View = 'search' | 'dropdown';

interface FilterSearchProps {
  search?: SearchProps;
  dropdown?: DropdownProps;
  defaultView?: View;
}

const credentials = [
  'GitPOAP',
  'Mazury',
  'POAP',
  'Buildspace',
  'Sismo',
  '101',
  'Kudos',
];

export const FilterSearch: React.FC<FilterSearchProps> = ({
  dropdown,
  search,
  defaultView = 'dropdown',
}) => {
  const formRef = React.useRef<HTMLFormElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const [view, setView] = React.useState<View>(() => defaultView);
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>();
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  useClickOutside(formRef, () => {
    setIsFocused(false);
    !searchTerm && setView(defaultView);
  });

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    dropdown?.onSelect(option);
  };

  const handleView = () => {
    setView('search');
    inputRef.current.focus();
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search?.onSearch(searchTerm);
  };

  return (
    <div className="relative h-12 w-full">
      <div
        className={clsx(
          'absolute inset-0 flex h-full grow items-center space-x-4',
          view === 'dropdown' ? 'visible' : 'invisible'
        )}
      >
        <button
          type="button"
          className={clsx(
            'relative flex h-full items-center justify-between rounded-lg  bg-indigoGray-5 px-4',
            dropdown?.className
          )}
          //   onClick={() => setToggleDropdown(!toggleDropdown)}
        >
          <p className="font-sansMid text-sm font-medium text-indigoGray-50">
            {selectedOption || `All ${dropdown?.label.toLowerCase()}`}
          </p>
          <SVG src="/icons/chevron-down.svg" height={24} width={24} />

          {toggleDropdown && (
            <div className="absolute top-0 left-0 z-10 h-[400px] w-full bg-red-200"></div>
          )}
        </button>

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
