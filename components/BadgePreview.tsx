import { Avatar } from '.';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BadgeDetail } from './BadgeDetail';
import { useMobile } from 'hooks';
import { useEffect } from 'react';

interface Props {
  imgSrc: string;
  heading: string;
  description: string;
  totalCount: number;
  badgeCount?: number;
}

export const BadgePreview: React.FC<Props> = ({
  imgSrc,
  heading,
  description,
  totalCount,
  badgeCount,
}) => {
  const isMobile = useMobile();
  const [showBadgeDetails, setShowBadgeDetails] = useState(false);

  return (
    <>
      <div
        className="relative flex"
        onClick={() => {
          isMobile && setShowBadgeDetails(true);
        }}
        onMouseEnter={() => setShowBadgeDetails(true)}
        onMouseLeave={() => setShowBadgeDetails(false)}
      >
        {!isMobile && (
          <AnimatePresence>
            {showBadgeDetails && (
              <BadgeDetail
                handleCloseModal={() => {
                  setShowBadgeDetails(false);
                }}
                isMobile={isMobile}
                title={heading}
                description={description}
                videoUrl=""
                isBadgeHidden={false}
                image={imgSrc}
                badgeCount={badgeCount}
                variant="badge"
              />
            )}
          </AnimatePresence>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} className="h-[100px]" alt={`${heading} badge`} />
        <div className="ml-6 flex flex-col gap-2">
          <h5 className="font-serif text-2xl font-bold text-indigoGray-90">
            {heading}
          </h5>
          <p className="text-sm font-medium text-indigoGray-80">
            {description}
          </p>
          {totalCount && (
            <span className="text-sm font-medium text-indigoGray-50">
              <NumberFormat
                value={totalCount}
                displayType="text"
                thousandSeparator
              />{' '}
              people have this badge
            </span>
          )}
        </div>
      </div>

      {isMobile && (
        <AnimatePresence>
          {showBadgeDetails && (
            <BadgeDetail
              handleCloseModal={() => {
                setShowBadgeDetails(false);
              }}
              isMobile={true}
              title={heading}
              description={description}
              videoUrl=""
              isBadgeHidden={false}
              image={imgSrc}
              badgeCount={badgeCount}
              variant="badge"
            />
          )}
        </AnimatePresence>
      )}
    </>
  );
};
