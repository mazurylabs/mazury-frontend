import Link from 'next/link';
import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Avatar, Button } from 'components';
import clsx from 'clsx';

interface Props {
  companyName: string;
  title: string;
  logo: string;
  location: string;
  salary: string;
  externalUrl?: string;
  candidatesUrl?: string;
  opportunityUrl?: string;
  applicants_count: number;
}

export const Opportunity: React.FC<Props> = ({
  opportunityUrl,
  candidatesUrl,
  title,
  logo,
  location,
  salary,
  externalUrl,
  companyName,
  applicants_count,
}) => {
  return (
    <div
      className={clsx(
        'min-h-[65px] bg-indigoGray-5 py-3 px-4 rounded-lg space-y-3 flex flex-col lg:flex-row lg:items-center lg:space-y-0 justify-between',
        (opportunityUrl || candidatesUrl) && 'min-h-[114px] lg:min-h-[65px]'
      )}
    >
      <div className="flex items-center space-x-3">
        <Avatar
          src={logo}
          alt={companyName}
          variant="md"
          className="h-10 w-10 rounded-lg"
        />
        <div className="space-y-1 font-sans font-normal">
          <p className="whitespace-nowrap text-sm text-indigoGray-90 font-medium">
            {title}
          </p>
          <div className="flex items-center space-x-4 text-xs text-indigoGray-40">
            <div className="flex items-center space-x-4">
              <p className="whitespace-nowrap text-teal-600 ">{companyName}</p>

              <p className="whitespace-nowrap flex items-center ">
                <SVG src="/icons/location.svg" className="h-4 w-4 mr-1" />
                {location}
              </p>
            </div>

            <div className="hidden xl:flex items-center space-x-4">
              <p className="whitespace-nowrap">{salary}</p>

              {externalUrl && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={externalUrl}
                  className="underline whitespace-nowrap"
                >
                  External link
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {(opportunityUrl || candidatesUrl) && (
        // Opening Links in new tabs so the user doesn't loose their project context

        <div className="flex space-x-3 font-sans text-sm font-normal text-indigoGray-90">
          {candidatesUrl && applicants_count > 0 ? (
            <Link
              href={candidatesUrl}
              target="_blank"
              className="p-2 border-[1.5px] border-transparent rounded-lg"
            >
              See {applicants_count} candidates
            </Link>
          ) : (
            <p className="p-2 border-[1.5px] border-transparent rounded-lg text-indigoGray-50 font-normal">
              No candidates yet
            </p>
          )}
          {opportunityUrl && (
            <Link
              href={opportunityUrl}
              target="_blank"
              className="p-2 border-[1.5px] border-indigoGray-20 rounded-lg"
            >
              See opportunity
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
