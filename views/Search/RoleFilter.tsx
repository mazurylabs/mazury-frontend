import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

import { useScreenWidth } from 'hooks';
import { FilterState, FilterType, ValueOf } from 'types';
import { fadeAnimation, trayAnimation } from 'utils';

interface RoleFilterProps {
  selectedRole: string;
  handleSelect: (key: keyof FilterState, value: ValueOf<FilterState>) => void;
  handleGoBack: (filter: FilterType) => void;
}

const roles = [
  { title: 'developer', icon: 'developer', supply: 658 },
  { title: 'designer', icon: 'designer', supply: 658 },
  { title: 'trader', icon: 'trader', supply: 658 },
  { title: 'creator', icon: 'creator', supply: 658 },
  { title: 'researcher', icon: 'researcher', supply: 658 },
  { title: 'investor', icon: 'investor', supply: 658 },
  { title: 'community manager', icon: 'community', supply: 658 },
];

export const RoleFilter = ({ handleGoBack, handleSelect }: RoleFilterProps) => {
  const screenWidth = useScreenWidth();

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  const handleRole = (role: string) => {
    const slug = role.split(' ').join('_');

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
                'flex h-[100px] max-h-[100px] cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border'
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
    </motion.div>
  );
};
