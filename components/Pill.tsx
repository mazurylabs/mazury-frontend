import Image from 'next/image';
import React from 'react';
import { ColorName, ProfileSection as Labels } from '../types';

interface Props {
  label: Labels | string;
  color?: ColorName;
  onClick?: () => void;
  active?: boolean;
  isNav?: boolean;
  className?: string;
}

const getClassName = (color: ColorName = 'black', active: boolean = false) => {
  const baseString = `${
    !active && 'text-black'
  } text-sm px-6 py-2 flex items-center gap-4 rounded-lg bg-none hover:cursor-pointer transition-colors duration-400 ${
    active ? 'font-bold' : 'font-medium'
  }`;

  switch (color) {
    case 'indigo':
      return `${baseString} hover:bg-indigo-50 hover:text-indigo-800 ${
        active &&
        'text-indigo-700 border bg-indigo-50 border-opacity-100 border-indigo-200'
      }`;
    case 'fuchsia':
      return `${baseString} hover:bg-fuchsia-50 hover:text-fuchsia-800 ${
        active &&
        'text-fuchsia-800 border bg-fuchsia-50 border-opacity-100 border-fuchsia-200'
      }`;
    case 'emerald':
      return `${baseString} hover:bg-emerald-50 ${
        active &&
        'text-emerald-700 border bg-emerald-50 border-opacity-100 border-emerald-200'
      }`;
    case 'amber':
      return `${baseString} hover:bg-amber-50 ${
        active &&
        'text-amber-700 border bg-amber-50 border-opacity-100 border-amber-200'
      }`;
    case 'purple':
      return `${baseString} hover:bg-purple-50 ${
        active &&
        'text-purple-700 border bg-purple-50 border-opacity-100 border-purple-200'
      }`;
    default:
      return `${baseString} hover:bg-blue-50 ${
        active && 'text-black bg-black'
      }`;
  }
};

const labelToIconName = {
  Activity: 'coffee',
  Badges: 'award',
  Referrals: 'message-circle',
  Writing: 'edit',
  DAOs: 'zap',
};

export const Pill: React.FC<Props> = ({
  label,
  color,
  onClick,
  active = false,
  isNav = false,
  className,
}) => {
  return (
    <button
      className={getClassName(color, active) + ' ' + className}
      onClick={onClick}
    >
      {isNav && (
        <Image
          src={`/icons/${labelToIconName[label as Labels]} ${
            active ? 'coloured' : 'black'
          }.svg`}
          width={18}
          height={18}
          alt={`${label} icon`}
        />
      )}

      {label.toUpperCase()}
    </button>
  );
};

interface LoadMoreProps {
  label?: string;
  color?: ColorName;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  isNav?: boolean;
}

export const LoadMoreButton: React.FC<LoadMoreProps> = ({
  label = 'Load More',
  color,
  onClick,
  active = false,
  isNav = false,
  className,
}) => {
  return (
    <Pill
      label={label}
      color={color}
      onClick={onClick}
      active={active}
      isNav={isNav}
      className={`mx-auto mt-8 border-2 border-indigoGray-90 shadow-base ${className}`}
    />
  );
};
