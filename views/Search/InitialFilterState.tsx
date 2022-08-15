import * as React from 'react';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';

import { Toggle } from 'components/Toggle';

import { trayAnimation, fadeAnimation } from 'utils';
import { useScreenWidth, useClickOutside } from 'hooks';
import { FilterType } from 'types';
interface Props {
  handleFilterNavigation: (filter: FilterType) => void;
  handleCloseModal: () => void;
  handleContactable: () => void;
  isContactable: boolean;
}

const filters: FilterType[] = ['Credentials', 'Roles', 'Referred skills'];

export const InitialFilterState = ({
  handleFilterNavigation,
  handleCloseModal,
  handleContactable,
  isContactable,
}: Props) => {
  const screenWidth = useScreenWidth();
  const containerRef = React.useRef(null!);
  useClickOutside(containerRef, handleCloseModal);

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  return (
    <motion.div
      ref={containerRef}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-[354px] w-full rounded-3xl bg-white p-6 pb-10 shadow-3xl md:h-[354px] md:w-[500px] lg:hidden"
    >
      <div className="space-y-6">
        <div>
          <button type="button" onClick={handleCloseModal}>
            <SVG src="/icons/x.svg" height={24} width={24} />
            <span className="sr-only">Close Modal</span>
          </button>
        </div>

        <div>
          <ul className="space-y-6">
            {filters.map((filter, index) => (
              <li
                key={filter + index}
                className="pointer-events-auto flex items-center justify-between"
                onClick={() => handleFilterNavigation(filter)}
              >
                <div className="space-y-[2px] font-sans">
                  <p className="text-sm font-semibold leading-[21px] text-indigoGray-60">
                    {filter}
                  </p>
                  {index === 2 && (
                    <p className="text-xs font-normal leading-[18px] text-black-800">
                      Users referred them for that
                    </p>
                  )}
                </div>
                <SVG src="/icons/arrow-right.svg" height={12.73} width={7.78} />
              </li>
            ))}

            <li
              className="flex items-center justify-between"
              onClick={handleContactable}
            >
              <div className="space-y-[2px] font-sans">
                <p className="text-sm font-semibold leading-[21px] text-indigoGray-60">
                  Contactable
                </p>
                <p className="text-xs font-normal leading-[18px] text-black-800">
                  Users with contact information in the profile
                </p>
              </div>

              <Toggle
                isToggled={isContactable}
                onToggle={handleContactable}
                className="flex h-fit"
              />
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
