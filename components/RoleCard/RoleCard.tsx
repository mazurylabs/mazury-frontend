import { useCurrentBreakpoint, useMobile } from 'hooks';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { TrimmedRole as Role } from 'types';
import { toCapitalizedWord } from 'utils';
import { RoleCardProps } from './RoleCard.types';

const getClassName = (role: Role, selected: boolean = false) => {
  const baseClassName =
    'transition-all duration-300 flex flex-col items-center gap-[10px] rounded-lg border-[1.5px] border-indigoGray-10 px-8 py-6 hover:cursor-pointer text-indigoGray-50 text-center';

  switch (role) {
    case 'developer':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-lime-900 lg:hover:bg-lime-50 lg:hover:border-lime-50'
      } ${selected && 'bg-lime-100 border-lime-400 text-lime-900'}`;
    case 'designer':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-amber-900 lg:hover:bg-amber-50 lg:hover:border-amber-50'
      } ${selected && 'bg-amber-100 border-amber-400 text-amber-900'}`;
    case 'trader':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-teal-900 lg:hover:bg-teal-50 lg:hover:border-teal-50'
      } ${selected && 'bg-teal-100 border-teal-400 text-teal-900'}`;
    case 'creator':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-violet-900 lg:hover:bg-violet-50 lg:hover:border-violet-50'
      } ${selected && 'bg-violet-100 border-violet-400 text-violet-900'}`;
    case 'researcher':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-pink-900 lg:hover:bg-pink-50 lg:hover:border-pink-50'
      } ${selected && 'bg-pink-100 border-pink-400 text-pink-900'}`;
    case 'investor':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-sky-900 lg:hover:bg-sky-50 lg:hover:border-sky-50'
      } ${selected && 'bg-sky-100 border-sky-400 text-sky-900'}`;
    case 'community_manager':
      return `${baseClassName} ${
        !selected &&
        'lg:hover:text-violet-900 lg:hover:bg-violet-50 lg:hover:border-violet-50'
      } ${selected && 'bg-violet-100 border-violet-400 text-violet-900'}`;
  }
};

export const RoleCard: FC<RoleCardProps> = ({
  iconSrc,
  role,
  coloredSrc,
  selected = false,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMobile();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={getClassName(role, selected)}
      onClick={onClick}
    >
      <Image
        src={(!isMobile && hovered) || selected ? coloredSrc : iconSrc}
        width="20px"
        height="20px"
        alt="Role icon"
      />
      <span className="text-xs font-bold uppercase">
        {toCapitalizedWord(role)}
      </span>
    </div>
  );
};
