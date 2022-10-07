import * as React from 'react';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';

import { trayAnimation, fadeAnimation } from 'utils';
import { useScreenWidth, useClickOutside } from 'hooks';
import { FilterType } from 'types';
interface Props {
  handleFilterNavigation: (filter: FilterType) => void;
  handleCloseModal: () => void;
  handleContactable: () => void;
  isContactable: boolean;
}

const filters: FilterType[] = [
  'Mazury',
  'POAP',
  'GitPOAP',
  'Buildspace',
  'Sismo',
  '101',
  'Kudos',
];

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
      className="h-[400px] w-full rounded-t-3xl bg-white p-6 pb-10 shadow-3xl md:h-[400px] md:w-[500px] lg:hidden"
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
                </div>
                <SVG src="/icons/arrow-right.svg" height={16} width={16} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
