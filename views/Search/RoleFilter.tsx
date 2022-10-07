import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

import { useScreenWidth } from 'hooks';
import { FilterState, FilterType, TrimmedRole, ValueOf } from 'types';
import { fadeAnimation, trayAnimation } from 'utils';

interface RoleFilterProps {
  selectedRole: string;
  handleSelect: (key: keyof FilterState, value: ValueOf<FilterState>) => void;
  handleGoBack: (filter: FilterType) => void;
  handleApplyFilter: (key: keyof FilterState, reset?: boolean) => void;
}

// type Role = Omit<TrimmedRole, 'community_manager'>;

const styleVariants = {
  developer: 'bg-lime-100 text-lime-900 border-lime-400',
  designer: 'bg-amber-100 text-amber-900 border-amber-400',
  trader: 'bg-teal-100 text-teal-900 border-teal-400',
  creator: 'bg-violet-50 text-violet-900 border-violet-400',
  researcher: 'bg-pink-100 text-pink-900 border-pink-400',
  investor: 'bg-sky-100 border-sky-400 text-sky-900',
  community: 'bg-violet-100 border-violet-400 text-violet-900',
};

const roles = [
  { title: 'developer', icon: 'developer', supply: 658 },
  { title: 'designer', icon: 'designer', supply: 658 },
  { title: 'trader', icon: 'trader', supply: 658 },
  { title: 'creator', icon: 'creator', supply: 658 },
  { title: 'researcher', icon: 'researcher', supply: 658 },
  { title: 'investor', icon: 'investor', supply: 658 },
  { title: 'community manager', icon: 'community', supply: 658 },
];

export const RoleFilter = ({
  handleGoBack,
  handleSelect,
  selectedRole,
  handleApplyFilter,
}: RoleFilterProps) => {
  const screenWidth = useScreenWidth();

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  const handleRole = (role: string) => {
    const slug = role.split(' ').join('_');

    if (selectedRole === slug) {
      handleSelect('role', '');
      return;
    }

    handleSelect('role', slug);
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-[434px] w-full !cursor-default flex-col rounded-3xl bg-white p-6 shadow-base md:h-[434px] md:w-[500px] lg:h-[375px]"
    >
      <div className="mb-6 lg:hidden">
        <button
          type="button"
          className="flex space-x-4"
          onClick={() => handleGoBack('empty')}
        >
          <div className="h-6 w-6">
            <SVG src="/icons/back.svg" height={24} width={24} />
          </div>
          <span className="font-sans text-xl font-medium leading-[30px] text-indigoGray-90">
            Roles
          </span>
        </button>
      </div>

      <div>
        <ul className="grid grid-cols-3 gap-3">
          {roles.map((role) => (
            <li
              key={role.title}
              className={clsx(
                'flex h-[100px] max-h-[100px] cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border border-[1.5px] font-sans font-bold',
                role.title === selectedRole &&
                  (styleVariants as any)[selectedRole],
                selectedRole === 'community_manager' &&
                  role.title === 'community manager' &&
                  styleVariants['community']
              )}
              onClick={() => handleRole(role.title)}
            >
              <div className="h-6 w-6 space-y-2">
                <SVG
                  src={`/icons/roles/${role.icon}.svg`}
                  height={24}
                  width={24}
                />
              </div>

              <div className="text-wrap space-y-2 font-sans">
                <p className="indigoGray-50 text-center text-xs font-bold uppercase leading-[18px]">
                  <span>{role.title}</span> <br />
                  {/* <span className="font-normal text-indigoGray-40 ">
                      ({role.supply})
                    </span> */}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-2">
        <button type="button" onClick={() => handleApplyFilter('role')}>
          Apply
        </button>

        <button type="button" onClick={() => handleApplyFilter('role', true)}>
          Reset
        </button>
      </div>
    </motion.div>
  );
};
