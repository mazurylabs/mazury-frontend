import clsx from 'clsx';
import Link from 'next/link';

import { Avatar } from 'components';
import { useRouter } from 'next/router';

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

interface Props {
  result?: Profile[];
}

export const Talent = ({ result }: Props) => {
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
              <div className="flex items-center  ">
                <div>
                  <Avatar
                    src={result.avatar}
                    height={40}
                    width={40}
                    alt={result?.username}
                  />
                </div>

                <div className="ml-3 flex flex-col items-start space-y-2 ">
                  <p className="font-serif text-xl font-bold leading-6 text-indigoGray-90">
                    {returnTruncatedIfEthAddress(result.username)}
                  </p>

                  <div className="flex flex-col lg:flex-row">
                    <p className="hidden font-sans text-xs font-medium leading-[18px] text-indigoGray-50 lg:flex">
                      {commify(result.referred_by.length)} referral
                      {result.referred_by.length > 1 && 's'}
                    </p>

                    {roles.length !== 0 && (
                      <div className="flex space-x-2 lg:hidden">
                        {roles.map((role, index) => (
                          <Tag
                            key={(role?.title as string) + result.id + index}
                            highlighted={role?.hightlighted}
                            label={role?.title}
                          />
                        ))}

                        {Boolean(roleRemainder) && <p>{roleRemainder} more</p>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden items-center lg:ml-auto lg:flex">
                  {roles.length !== 0 && (
                    <>
                      <div className="space-x-2 lg:flex">
                        {roles.map((role, index) => (
                          <Tag
                            key={(role?.title as string) + result.id + index}
                            highlighted={role?.hightlighted}
                            label={role?.title}
                          />
                        ))}

                        {Boolean(roleRemainder) && <p>{roleRemainder} more</p>}
                      </div>

                      <div className="mx-[15px] h-[43px] w-[1px] bg-indigoGray-90 opacity-[0.05]" />
                    </>
                  )}

                  <div className="hidden space-x-2 lg:flex">
                    {badges.map((badge) => (
                      <Tag
                        key={badge.title + result.id}
                        highlighted={badge?.hightlighted}
                        label={badge.title}
                      />
                    ))}

                    {Boolean(remainder) && <p>{remainder} more</p>}
                  </div>
                </div>

                <div className="ml-auto self-start lg:hidden">
                  <p className="font-sans text-xs font-medium leading-[18px] text-indigoGray-50 lg:flex">
                    {commify(result.referred_by.length)} referral
                    {result.referred_by.length > 1 && 's'}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 lg:hidden">
                {badges.map((badge) => (
                  <Tag
                    key={badge.title + result.id}
                    highlighted={badge?.hightlighted}
                    label={badge.title}
                  />
                ))}

                {Boolean(remainder) && <p>{remainder} more</p>}
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
