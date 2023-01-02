import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Checkbox } from 'components';

const dummyCredentials = [
  {
    id: 1,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 2,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 3,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 4,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 5,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 6,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 7,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 8,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 9,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
  {
    id: 10,
    title: 'Hardhat OSS Contributor 2022',
    description: 'The holder of this badge has successfully finished',
    ownedBy: '1234',
    image: '/icons/dummyCredential.svg',
  },
];

export const HighlightCredentials = () => {
  const [selectedCredentials, setSelectedCredentials] = React.useState<
    number[]
  >([]);

  const handleSelectCredential = (id: number) =>
    setSelectedCredentials((credentials) => {
      if (credentials.length === 8 && !credentials.includes(id))
        return credentials;

      if (credentials.includes(id)) {
        return credentials.filter((prevID) => prevID !== id);
      }

      return [...credentials, id];
    });

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
        {dummyCredentials.map((credential) => (
          <Credential
            key={credential.id}
            imageSrc={credential.image}
            title={credential.title}
            ownedBy={credential.ownedBy}
            description={credential.description}
            isSelected={selectedCredentials.includes(credential.id)}
            onSelect={() => handleSelectCredential(credential.id)}
          />
        ))}
      </div>
    </div>
  );
};

const Credential = ({
  isSelected,
  imageSrc,
  title,
  description,
  ownedBy,
  onSelect,
}: {
  isSelected?: boolean;
  imageSrc: string;
  title: string;
  description: string;
  ownedBy?: string;
  onSelect: () => void;
}) => {
  return (
    <div
      className={`flex cursor-pointer items-center space-x-4 px-4 py-2 ${
        isSelected
          ? 'rounded-lg border border-indigoGray-20 bg-indigoGray-5'
          : ''
      }`}
      onClick={onSelect}
    >
      <Checkbox
        innerClassName="h-4 w-4"
        outerClassName="h-4 w-4"
        checked={!!isSelected}
        setChecked={onSelect}
        label=""
        id={''}
      />
      <img src={imageSrc} className="h-12 w-12 shrink-0" />
      <div className="space-y-1">
        <p className="font-sans text-sm font-semibold text-indigoGray-90">
          {title}
        </p>
        <p className="font-sans text-xs font-medium text-indigoGray-50">
          {description}
        </p>
        <p className="font-sans text-xs font-medium text-indigo-500">
          {ownedBy || 0} people have this
        </p>
      </div>
    </div>
  );
};
