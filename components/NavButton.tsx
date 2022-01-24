import Image from 'next/image';
import React from 'react';
import { ColorName } from '../types';

type Labels = 'Activity' | 'Badges' | 'Referrals' | 'Blog posts' | 'DAOs';

interface Props {
  label: Labels;
  color?: ColorName;
  onClick?: () => void;
}

const getClassName = (color: ColorName = 'black') => {
  const baseString =
    'text-black px-6 py-2 rounded-lg bg-none hover:cursor-pointer transition-colors duration-500 hover:bg-opacity-3 flex gap-4';

  switch (color) {
    case 'purple':
      return `${baseString} hover:text-purple hover:bg-purple`;
    case 'pink':
      return `${baseString} hover:text-pink hover:bg-pink`;
    case 'green':
      return `${baseString} hover:text-green hover:bg-green`;
    case 'brown':
      return `${baseString} hover:text-brown hover:bg-brown`;
    case 'lemon':
      return `${baseString} hover:text-lemon hover:bg-lemon`;
    default:
      return `${baseString} hover:text-black hover:bg-black`;
  }
};

const getIconClassName = (color: ColorName = 'black') => {
  switch (color) {
    case 'purple':
      return 'text-purple';
    case 'pink':
      return 'text-pink';
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
  Badges: 'badge',
  Referrals: 'referrals',
  'Blog posts': 'blog',
  DAOs: 'zap',
};

export const NavButton: React.FC<Props> = ({ label, color, onClick }) => {
  return (
    <button className={getClassName(color)} onClick={onClick}>
      <Image
        src={`/icons/${labelToIconName[label]}.svg`}
        width={24}
        height={24}
        alt={`${label} icon`}
        className={getIconClassName(color)}
      />
      {label}
    </button>
  );
};
