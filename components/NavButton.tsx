import Image from 'next/image';
import React from 'react';
import { ColorName, ProfileSection as Labels } from '../types';
import Badge from '../public/icons/badge.svg';

interface Props {
  label: Labels;
  color?: ColorName;
  onClick?: () => void;
  active?: boolean;
}

const getClassName = (color: ColorName = 'black', active: boolean = false) => {
  const baseString = `${
    !active && 'text-black'
  } px-6 py-2 flex items-center rounded-lg bg-none hover:cursor-pointer transition-colors duration-500 bg-opacity-3 hover:bg-opacity-3 flex gap-4 ${
    active && 'font-bold'
  }`;

  switch (color) {
    case 'purple':
      return `${baseString} hover:text-purple hover:bg-purple ${
        active && 'text-purple bg-purple'
      }`;
    case 'pink':
      return `${baseString} hover:text-pink-500 hover:bg-pink-500 ${
        active && 'text-pink-500 bg-pink-500'
      }`;
    case 'green':
      return `${baseString} hover:text-green hover:bg-green ${
        active && 'text-green bg-green'
      }`;
    case 'brown':
      return `${baseString} hover:text-brown hover:bg-brown ${
        active && 'text-brown bg-brown'
      }`;
    case 'lemon':
      return `${baseString} hover:text-lemon hover:bg-lemon ${
        active && 'text-lemon bg-lemon'
      }`;
    default:
      return `${baseString} hover:text-black hover:bg-black ${
        active && 'text-black bg-black'
      }`;
  }
};

const getIconClassName = (color: ColorName = 'black') => {
  switch (color) {
    case 'purple':
      return 'text-purple';
    case 'pink':
      return 'text-pink-500';
    case 'green':
      return 'text-green';
    case 'brown':
      return 'text-brown';
    case 'lemon':
      return 'text-lemon';
    default:
      return 'text-black';
  }
};

const labelToIconName = {
  Activity: 'coffee',
  Badges: 'award',
  Referrals: 'message-circle',
  'Blog posts': 'edit',
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
        className={getIconClassName(color)}
      />
      {label.toUpperCase()}
    </button>
  );
};
