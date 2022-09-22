import * as React from 'react';
import { useRouter } from 'next/router';

import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BadgeDetail } from './BadgeDetail';
import { useMobile } from 'hooks';
import SVG from 'react-inlinesvg';
import { Pill } from 'components';
import { getBadgeById } from '@/utils/api';

import { truncateString } from 'utils';

interface Props {
  imgSrc: string;
  heading: string;
  description: string;
  totalCount: number;
  badgeCount?: number;
  slug: string;
  issuer: string;
  id: string;
  canBeMinted: boolean;
  mintedAt: string;
  owner: string;
  routeId?: string;
}

export const BadgePreview: React.FC<Props> = ({
  imgSrc,
  heading,
  description,
  totalCount,
  badgeCount,
  slug,
  issuer,
  id,
  canBeMinted,
  mintedAt,
  owner,
  routeId,
}) => {
  const router = useRouter();
  const isMobile = useMobile();
  const [showBadgeDetails, setShowBadgeDetails] = useState(false);

  const selectedCredential = (router?.query?.credential as string)?.split(
    '#'
  )[1];

  React.useEffect(() => {
    if (selectedCredential === id || routeId) setShowBadgeDetails(true);
  }, [selectedCredential, id]);

  const handleToggleModal = async (id?: string) => {
    router.push(
      {
        pathname: router.asPath.split('?')[0],
        ...(id ? { query: { credential: `${issuer}#${id}` } } : {}),
      },
      undefined,
      { shallow: true }
    );

    if (id) {
      setShowBadgeDetails(true);
    }
  };

  return (
    <>
      <div
        className="relative flex cursor-pointer items-center rounded-2xl border border-indigoGray-10 p-4 hover:border-indigoGray-20 hover:shadow-lg"
        onClick={() => handleToggleModal(id)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc || '/default-avi.png'}
          className={
            `${
              issuer !== 'mazury' ? 'h-[42px]' : 'h-[65px]'
            } max-w-[42px] text-xs` +
            (issuer !== 'mazury' ? 'overflow-hidden rounded-full' : '')
          }
          alt={`${heading} badge`}
        />
        <div className="ml-6 flex flex-col space-y-2">
          <h5 className="font-demi font-serif text-xl font-semibold  font-bold leading-6 text-indigoGray-90">
            {heading}
          </h5>
          {
            <p className="text-sm font-medium text-indigoGray-80">
              {truncateString(description, 100)}
            </p>
          }
          {totalCount && (
            <span className="font-inter text-xs font-medium leading-[14.4px] text-indigoGray-50">
              <NumberFormat
                value={totalCount}
                displayType="text"
                thousandSeparator
              />{' '}
              {totalCount > 1 ? 'people' : 'person'}{' '}
              {totalCount > 1 ? 'have' : 'has'} this
            </span>
          )}

          <div className="flex space-x-2">
            {issuer === 'mazury' && !canBeMinted && (
              <div className="font-inter flex items-center space-x-2 bg-emerald-50 px-2 py-[3.5px] text-xs leading-[14.4px] text-emerald-900">
                <SVG src="/icons/minted.svg" height={16} width={16} />
                <span>Minted</span>
              </div>
            )}
          </div>
        </div>

        <div className="ml-auto lg:hidden">
          <SVG src="/icons/arrow-right.svg" height={12} width={12} />
        </div>
      </div>

      <AnimatePresence>
        {showBadgeDetails && (
          <BadgeDetail
            handleCloseModal={handleToggleModal}
            isMobile={isMobile}
            title={heading}
            description={description}
            videoUrl=""
            isBadgeHidden={false}
            image={imgSrc}
            badgeCount={totalCount}
            variant={issuer === 'mazury' ? 'badge' : issuer}
            slug={slug}
            id={id}
            owner={owner}
            canBeMinted={canBeMinted}
            mintedAt={mintedAt}
          />
        )}
      </AnimatePresence>
    </>
  );
};
