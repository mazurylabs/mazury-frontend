import * as React from 'react';
import { motion } from 'framer-motion';
import SVG from 'react-inlinesvg';

import { useScreenWidth } from 'hooks';
import { FilterType } from 'types';
import { commify, fadeAnimation, trayAnimation } from 'utils';

interface ReferralFilterProps {
  selectedReferrals: string[];
  handleSelectReferral: (filter: string) => void;
  handleGoBack: (filter: FilterType) => void;
}

const referrals = [
  { range: '1 - 5', supply: 40 },
  { range: '6 - 10', supply: 14 },
  { range: '11 - 20', supply: 43 },
  { range: '20+', supply: 0 },
];

export const ReferralFilter = ({
  handleGoBack,
  handleSelectReferral,
  selectedReferrals,
}: ReferralFilterProps) => {
  const screenWidth = useScreenWidth();

  const variants =
    screenWidth > 768 ? {} : screenWidth <= 640 ? trayAnimation : fadeAnimation;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-[250px] w-full !cursor-default flex-col rounded-3xl bg-white p-6 shadow-base md:w-[500px] lg:h-[136px] lg:w-[260px]"
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
            Referred skills
          </span>
        </button>
      </div>

      <div>
        <ul className="grid gap-3 lg:grid-cols-2">
          {referrals.map((referral) => (
            <li
              key={referral.range}
              onClick={() => handleSelectReferral(referral.range)}
              className="flex h-[38px] shrink-0 items-center justify-center rounded border py-[7px] px-4 "
            >
              <p className="flex w-full text-base font-medium text-indigoGray-90">
                <span>{referral.range}</span>
                <span className="opacity-0" role="presentation">
                  i
                </span>
                <span className="text-indigoGray-40">
                  ({commify(referral.supply)})
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
