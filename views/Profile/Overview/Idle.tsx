import * as React from 'react';
import { useRouter } from 'next/router';

import { OverviewViews } from 'pages/profile/[address]';
import { Progress } from 'components';

interface IdleProps {
  handleNavigateViews: (view: OverviewViews) => void;
  address?: string;
}

export const Idle = ({ handleNavigateViews, address }: IdleProps) => {
  const router = useRouter();
  const [showLess, setShowLess] = React.useState(false);

  return (
    <div className="overflow-hidden rounded-lg lg:max-w-[826.6px]">
      <div className="flex w-full items-center justify-between bg-indigoGray-90 py-3 px-6">
        <div className="flex items-center space-x-8">
          <p className="font-sans text-sm font-semibold text-indigoGray-5">
            Complete your profile
          </p>
          <Progress
            total={4}
            current={3}
            label="complete"
            size="small"
            variant="dark"
          />
        </div>
        <button
          className="m-0 p-0 font-sansMid text-sm font-medium text-indigoGray-5"
          onClick={() => setShowLess(!showLess)}
        >
          {showLess ? 'Show less' : 'Show more'}
        </button>
      </div>

      {!showLess && (
        <div className="border-t-none flex rounded-b-lg border border-indigoGray-20 py-3 px-6">
          <button
            className="m-0 shrink-0 p-0 pr-[10px] font-sansSemi text-xs font-semibold text-indigoGray-90"
            onClick={() => router.push(`${router.asPath}/edit`)}
          >
            Add personal information
          </button>
          <button
            className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
            onClick={() => handleNavigateViews('discover')}
          >
            Discover web3 credentials
          </button>
          <button
            className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
            onClick={() => handleNavigateViews('highlight')}
          >
            Highlight credentials
          </button>
          <button
            className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
            onClick={() => handleNavigateViews('social')}
          >
            Connect social media
          </button>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://airtable.com/shr7Cjchcji8zMay7?prefill_Mazury+profile=https://app.mazury.xyz/people/${address}`}
            className="!m-0 shrink-0 border-l border-l-indigoGray-20 !p-0 !pl-[10px] !pr-[10px] font-sansSemi  !text-xs !font-semibold text-indigoGray-90"
          >
            Sign up for Mazury Talent
          </a>
        </div>
      )}
    </div>
  );
};
