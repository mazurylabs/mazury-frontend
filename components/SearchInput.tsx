import Image from 'next/image';
import React, { KeyboardEvent, useState } from 'react';
import { FCWithClassName } from 'types';
import { colors } from 'utils';
import { SearchIcon } from './Icons';

/**
 * ============================================================
 * SearchInput component
 * ============================================================
 */
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  handleKeyPress?: (e: KeyboardEvent) => void;
  placeholder?: string;
  showBackIcon?: boolean;
}

export const SearchInput: FCWithClassName<SearchInputProps> = ({
  value,
  onChange,
  handleKeyPress,
  className,
  placeholder,
  showBackIcon = false,
}) => {
  const [touched, setTouched] = useState(false);

  return (
    <div
      role="input"
      className={`flex w-full items-center gap-2 rounded-xl bg-indigoGray-5 p-[14px] text-[14px] font-normal`}
      onFocus={() => setTouched(true)}
      onClick={() => {
        if (!touched) {
          setTouched(true);
        }
      }}
      onKeyUp={handleKeyPress}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {showBackIcon && touched ? (
        <Image
          src="/icons/arrow-left.svg"
          width={24}
          height={24}
          alt="Go back icon"
          className="hover:cursor-pointer"
          onClick={() => setTouched(false)}
        />
      ) : (
        <SearchIcon
          className="hover:cursor-pointer"
          width="24px"
          height="24px"
          color={colors.indigoGray[90]}
        />
      )}

      <input
        className="h-[20px] w-3/4 bg-indigoGray-5 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        placeholder={placeholder || 'wojtek.eth, Frontend dev...'}
      />
    </div>
  );
};

/**
 * ============================================================
 * InputWithIcon component
 * ============================================================
 */
interface InputWithIconProps {
  iconSrc: string;
  iconAlt: string;
  placeholder?: string;
  expanded?: boolean;
}

export const InputWithIcon: React.FC<
  InputWithIconProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ iconSrc, iconAlt, placeholder, expanded = true, ...props }) => {
  const { onClick } = props;

  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-xl bg-indigoGray-20 p-4 text-[14px] font-normal`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt={iconAlt}
        className={`h-[16px] w-[16px] ${!expanded && 'hover:cursor-pointer'}`}
      />
      {expanded && (
        <input
          className="h-[16px] w-3/4 bg-indigoGray-20 outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
