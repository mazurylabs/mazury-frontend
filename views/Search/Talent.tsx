import clsx from 'clsx';
import Link from 'next/link';

import { FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import { Avatar } from 'components';
import { useRouter } from 'next/router';
import { truncateString } from '@/utils';

import { Badge, Profile } from 'types';
import {
  commify,
  getHighlightedBadges,
  getRoles,
  returnTruncatedIfEthAddress,
} from 'utils';

const Tag = ({
  label,
  highlighted,
}: {
  label?: string;
  highlighted?: boolean;
}) => {
  return (
    <p
      className={clsx(
        highlighted && 'bg-emerald-50 text-emerald-900',
        'flex h-fit w-fit items-center rounded bg-indigoGray-5 px-2 py-1 font-sans text-xs font-bold text-indigoGray-90'
      )}
    >
      {(label as string)[0].toUpperCase() + label?.slice(1)}
    </p>
  );
};

const CredentialTag = ({
  label,
  image,
}: {
  label?: string;
  image?: string;
}) => {
  return (
    <div
      className={clsx(
        'flex h-fit w-fit items-center rounded bg-indigoGray-5 px-2 py-1 font-sans text-xs font-semibold text-indigoGray-90'
      )}
    >
      {image?.includes('mp4') ? (
        <video src={image} className="mr-2 h-4 w-4 object-contain"></video>
      ) : (
        <img src={image} className="mr-2 h-4 w-4 object-contain" />
      )}
      {truncateString(label as string, 25)}
    </div>
  );
};

export const Talent = ({ result }) => {
  const { query } = useRouter();

  const composeRoles = (data: Profile) => getRoles(data, query);
  const composeBadges = (data: Badge[]) => getHighlightedBadges(data, query);

  return (
    <div className="space-y-4">
      {result?.map((result) => {
        const { roles, remainder: roleRemainder } = composeRoles(result);
        const { badges, remainder } = composeBadges(result.top_badges);

        return (
          <Link
            key={result.id}
            href={`/people/${result.username || result.eth_address}`}
          >
            <a className="flex list-none flex-col space-y-4 rounded-2xl border border-indigoGray-20 p-4 shadow-sm lg:space-y-0">
              <div className="flex items-center">
                <div>
                  <Avatar
                    src={result.avatar}
                    height={40}
                    width={40}
                    alt={result?.username}
                    className={'object-cover'}
                  />
                </div>

                <div className="ml-3 flex flex-col items-start space-y-2 lg:w-40">
                  <p className="font-serif text-xl font-bold leading-6 text-indigoGray-90">
                    {returnTruncatedIfEthAddress(result.username)}
                  </p>

                  <div className="flex flex-col lg:flex-row">
                    <p className="hidden font-sans text-xs font-medium leading-[18px] text-indigoGray-50 lg:flex">
                      {/* result.credential_count.length */}
                      {commify(result.credentials_count as number)} credential
                      {(result.credentials_count as number) != 1 && 's'}
                    </p>
                  </div>
                </div>
                <div className="mx-[15px] hidden h-[43px] w-[1px] bg-indigoGray-90 opacity-[0.05] lg:block" />

                <div className="hidden items-center lg:ml-10 lg:flex">
                  {(result.credentials_count as number) > 0 ? (
                    <div className="hidden space-x-2 lg:flex lg:items-center">
                      {badges.map((badge) => (
                        <CredentialTag
                          key={badge.title + result.id}
                          label={badge.title}
                          image={badge.image}
                        />
                      ))}

                      {(result.credentials_count as number) > 3 && (
                        <p className="pl-2 text-xs font-medium text-gray-700">
                          and {(result.credentials_count as number) - 3} more
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs font-medium text-gray-700">
                      No credentials found
                    </p>
                  )}
                </div>
                <div className="hidden w-24 items-center space-x-3 lg:ml-auto lg:flex">
                  <div className="mr-1 h-[43px] w-[1px] bg-indigoGray-90 opacity-[0.05]" />
                  {!Boolean(result.twitter) &&
                    !Boolean(result.website) &&
                    !Boolean(result.github) && (
                      <p className="text-xs font-medium text-gray-700">
                        No socials
                      </p>
                    )}
                  {Boolean(result.twitter) && <FaTwitter />}
                  {Boolean(result.website) && <FaGlobe />}
                  {Boolean(result.github) && <FaGithub />}
                </div>

                <div className="ml-auto self-start lg:hidden">
                  <p className="font-sans text-xs font-medium leading-[18px] text-indigoGray-50 lg:flex">
                    {/* result.credential_count.length */}
                    {commify(result.credentials_count as number)} credential
                    {(result.credentials_count as number) != 1 && 's'}
                  </p>
                </div>
              </div>

              {(result.credentials_count as number) > 0 ? (
                <div className="flex flex-col space-y-1 lg:hidden">
                  {badges.map((badge) => (
                    <CredentialTag
                      key={badge.title + result.id}
                      label={badge.title}
                      image={badge.image}
                    />
                  ))}

                  {(result.credentials_count as number) > 3 && (
                    <p className="pl-2 text-xs font-medium text-gray-700">
                      and {(result.credentials_count as number) - 3} more
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs font-medium text-gray-700 lg:hidden">
                  No credentials found
                </p>
              )}
            </a>
          </Link>
        );
      })}
    </div>
  );
};
