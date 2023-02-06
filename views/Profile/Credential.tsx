import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Checkbox } from 'components';
import { commify, truncateString } from 'utils';
import { BadgeIssuer } from 'types';
import clsx from 'clsx';

interface Credential {
  isSelected?: boolean;
  imageSrc: string;
  title: string;
  description: string;
  totalSupply?: number;
  variant?: BadgeIssuer;
  onSelect: () => void;
  className?: string;
  showCheckbox?: boolean;
  isHidden?: boolean;
}

const Skeleton = () => {
  return (
    <div className={`flex w-full items-center space-x-4`}>
      <div className="h-12 w-12 animate-pulse rounded-full bg-indigoGray-30" />
      <div className="h-full grow space-y-1">
        <div className="h-3 w-[80%] animate-pulse rounded-lg bg-indigoGray-30" />
        <div className="h-3 w-full animate-pulse rounded-lg bg-indigoGray-30" />
        <div className="h-3 w-[30%] animate-pulse rounded-lg bg-indigoGray-30" />
      </div>
    </div>
  );
};

export const Credential: React.FC<Credential> & {
  Skeleton: typeof Skeleton;
} = ({
  isSelected,
  imageSrc,
  title,
  description,
  totalSupply,
  onSelect,
  className,
  showCheckbox,
  variant = 'mazury',
  isHidden,
}) => {
  const supply = +(totalSupply || '0');

  return (
    <div
      className={`flex cursor-pointer items-center space-x-4 border ${
        isSelected
          ? 'rounded-lg border-indigoGray-20 bg-indigoGray-5'
          : 'border-transparent'
      } ${className} ${showCheckbox ? 'px-4 py-2' : ''}`}
      onClick={onSelect}
    >
      {showCheckbox && (
        <Checkbox
          innerClassName="h-4 w-4"
          outerClassName="h-4 w-4"
          checked={!!isSelected}
          setChecked={onSelect}
          label=""
          id={''}
        />
      )}

      <div className={`w-[48px]`}>
        <img
          loading="lazy"
          decoding="async"
          src={imageSrc || '/icons/brokenImage.svg'}
          onError={(event) => {
            event.currentTarget.src = '/icons/brokenImage.svg';
          }}
          className={clsx(
            'h-[48px] w-full shrink-0 overflow-hidden object-contain',
            (variant === 'gitpoap' || variant === 'poap') && 'rounded-full'
          )}
        />
      </div>

      <div className="space-y-1">
        <p className="font-sans text-sm font-semibold text-indigoGray-90">
          {truncateString(title, 35)}
        </p>
        <p className="font-sans text-xs font-medium text-indigoGray-50">
          {truncateString(description, 41)}
        </p>
        <p className="font-sans text-xs font-medium text-indigo-500">
          {commify(supply)} {supply === 1 ? 'person has' : 'people have'} this
        </p>

        {isHidden && (
          <div className="flex w-fit items-center space-x-2 rounded-md bg-indigoGray-90 py-[2px] px-2 ">
            <SVG src="/icons/eye-slash-white.svg" height={16} width={16} />
            <p className="font-sans text-xs font-medium text-indigoGray-5">
              Hidden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

Credential.Skeleton = Skeleton;
