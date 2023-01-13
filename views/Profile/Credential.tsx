import * as React from 'react';

import { Checkbox } from 'components';
import { commify, truncateString } from 'utils';
import { BadgeIssuer } from 'types';

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
}

const credentialClass: Record<BadgeIssuer, string> = {
  '101': 'rounded h-[65px] min-w-[65px] max-w-[65px] bg-gray-100',
  buildspace: 'rounded h-[65px] min-w-[65px] max-w-[65px] bg-gray-100',
  gitpoap: 'rounded-full h-[65px] min-w-[65px] max-w-[65px]',
  kudos: 'rounded h-[65px] min-w-[65px] max-w-[65px]',
  mazury: 'h-[65px] max-w-[42]',
  poap: 'rounded-full h-[65px] min-w-[65px] max-w-[65px]',
  sismo: ' h-[65px] min-w-[65px] max-w-[65px]',
};

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

      <div className={`min-w-[40px]`}>
        <img
          src={imageSrc}
          onError={(event) => {
            event.currentTarget.src = '/icons/brokenImage.svg';
            event.currentTarget.classList.add('h-[48px]', 'w-[48px]');
          }}
          className={`shrink-0 overflow-hidden ${credentialClass[variant]}`}
        />
      </div>

      <div className="space-y-1">
        <p className="font-sans text-sm font-semibold text-indigoGray-90">
          {title}
        </p>
        <p className="font-sans text-xs font-medium text-indigoGray-50">
          {truncateString(description, 41)}
        </p>
        <p className="font-sans text-xs font-medium text-indigo-500">
          {commify(supply)} {supply === 1 ? 'person has' : 'people have'} this
        </p>
      </div>
    </div>
  );
};

Credential.Skeleton = Skeleton;
