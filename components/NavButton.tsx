import Image from 'next/image';
import React from 'react';
import { ColorName, ProfileSection as Labels } from '../types';

interface Props {
  label: Labels;
  color?: ColorName;
  onClick?: () => void;
  active?: boolean;
}

const getClassName = (color: ColorName = 'black', active: boolean = false) => {
  const baseString = `${
    !active && 'text-black'
  } text-sm px-6 py-2 flex items-center gap-4 rounded-lg bg-none hover:cursor-pointer hover:text-blue-700 hover:bg-blue-50 transition-colors duration-400 ${
    active ? 'font-bold' : 'font-medium'
  }`;

  switch (color) {
    case 'indigo':
      return `${baseString} ${
        active &&
        'text-indigo-700 border-2 bg-indigo-50 border-opacity-100 border-indigo-200'
      }`;
    case 'fuchsia':
      return `${baseString} ${
        active &&
        'text-fuchsia-800 border-2 bg-fuchsia-50 border-opacity-100 border-fuchsia-200'
      }`;
    case 'emerald':
      return `${baseString} ${
        active &&
        'text-emerald-700 border-2 bg-emerald-50 border-opacity-100 border-emerald-200'
      }`;
    case 'amber':
      return `${baseString} ${
        active &&
        'text-amber-700 border-2 bg-amber-50 border-opacity-100 border-amber-200'
      }`;
    case 'purple':
      return `${baseString} ${
        active &&
        'text-purple-700 border-2 bg-purple-50 border-opacity-100 border-purple-200'
      }`;
    default:
      return `${baseString} ${active && 'text-black bg-black'}`;
  }
};

const labelToIconName = {
  Activity: 'coffee',
  Badges: 'award',
  Referrals: 'message-circle',
  Writing: 'edit',
  DAOs: 'zap',
};

export const NavButton: React.FC<Props> = ({
  label,
  color,
  onClick,
  active = false,
}) => {
  return (
    <button className={getClassName(color, active)} onClick={onClick}>
      <Image
        src={`/icons/${labelToIconName[label]} ${
          active ? 'coloured' : 'black'
        }.svg`}
        width={18}
        height={18}
        alt={`${label} icon`}
      />
      {label.toUpperCase()}
    </button>
  );
};
