import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Spinner } from 'components';
import { Credential } from '../Credential';
import { useBadges } from 'hooks';
import { BadgeIssuer } from 'types';

interface HighlightCredentialsProps {
  address: string;
}

const skeletons = Array(20).fill('skeleton');

export const HighlightCredentials: React.FC<HighlightCredentialsProps> = ({
  address,
}) => {
  const [badgeIssuer, setBadgeIssuer] = React.useState<BadgeIssuer>('mazury');
  const { badges, handleFetchMore, hasMoreData } = useBadges(
    address,
    badgeIssuer,
    10
  );
  const [selectedCredentials, setSelectedCredentials] = React.useState<
    string[]
  >([]);

  const handleSelectCredential = (id: string) => {
    setSelectedCredentials((credentials) => {
      if (credentials.length === 8 && !credentials.includes(id))
        return credentials;

      if (credentials.includes(id)) {
        return credentials.filter((prevID) => prevID !== id);
      }

      return [...credentials, id];
    });
  };

  return (
    <div className="space-y-6">
      <form className="flex w-full items-center rounded-lg bg-indigoGray-5 py-3 pl-[14px] pr-2">
        <div className="flex h-6 w-6">
          <SVG height={24} width={24} src={`/icons/search-black.svg`} />
        </div>

        <div className="ml-4 mr-10 grow font-sans  text-base font-medium">
          <input
            type="text"
            placeholder="Paradign CTF 2022, ETHAmsterdam 2022 Finalist Hacker..."
            aria-label="Search"
            className="hidden h-full w-full bg-transparent lg:block"
            value={''}
            onChange={() => {}}
          />
        </div>
      </form>

      <div className="flex space-x-6">
        <div className="rounded-md bg-indigoGray-10 p-3">
          <p className="font-inter text-sm font-medium text-indigoGray-90">
            {selectedCredentials.length} selected out of 8 possible
          </p>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {badges?.length > 0
          ? badges?.map(({ badge_type }) => {
              const { title, id, total_supply, description, image, issuer } =
                badge_type;
              return (
                <Credential
                  key={id}
                  imageSrc={image}
                  title={title}
                  variant={issuer.name}
                  totalSupply={total_supply}
                  description={description}
                  showCheckbox={true}
                  isSelected={selectedCredentials.includes(id)}
                  onSelect={() => handleSelectCredential(id)}
                  className={`${
                    selectedCredentials.length >= 8 &&
                    !selectedCredentials.includes(id)
                      ? 'cursor-not-allowed'
                      : ''
                  } `}
                />
              );
            })
          : skeletons.map((item, index) => (
              <Credential.Skeleton key={index + item} />
            ))}
      </div>
    </div>
  );
};
