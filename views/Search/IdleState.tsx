import Image from 'next/image';
import { useRouter } from 'next/router';

import { BadgeModal } from 'components';
import { commify } from 'utils';
import { FilterState, ValueOf } from 'types';

interface IdleStateProps {
  handleSearch: (term: string) => void;
}

const keywordSuggestions = [
  { title: 'Frontend developer', results: 259 },
  { title: 'Smart contract developer', results: 792 },
  { title: 'Designer', results: 163 },
];

const badgeSuggestions = [
  {
    title: 'Contract deployer',
    slug: 'contract_deployer',
    img: '/badges/contract_deployer.png',
    detail: 'People who deployed a smart contract',
  },
  {
    title: 'Buildspace alumni',
    slug: 'buildspace',
    img: '/badges/buildspace.png',
    detail: 'People who finished a buildspace course',
  },
  {
    title: 'Developer DAO member',
    slug: 'd_d_member',
    img: '/badges/d_d.png',
    detail: 'Members of Developer DAO',
  },
];

export const IdleState = () => {
  const router = useRouter();

  const handleSearch = (key: string, searchTerm: string) => {
    router.push(
      { pathname: '/search', query: { [key]: searchTerm } },
      undefined,
      { shallow: true }
    );
  };

  // const handleSearch = (term: string, slug?: string) => {};

  return (
    <div className="w-full lg:flex">
      <div className="grow-[3] border-b border-solid border-indigoGray-20 pb-7 lg:border-b-0 lg:pb-0">
        <div className="mb-3 flex text-xs font-medium text-indigoGray-40">
          <h2>KEYWORD SUGGESTIONS</h2>
        </div>

        <ul className="font-inter font-medium">
          {keywordSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="mb-6 cursor-pointer"
              onClick={() => handleSearch('query', suggestion.title)}
            >
              <p className="text-sm text-indigoGray-90">{suggestion.title}</p>

              <div className="flex text-xs  text-indigoGray-50">
                <p>{commify(suggestion.results)} results</p>

                {/* {suggestion.mostSearched && (
                  <>
                    <div className="mx-2 flex">
                      <Image
                        width={4}
                        height={4}
                        src="/icons/list-disc-grey.svg"
                        alt="list-disc"
                      />
                    </div>
                    <p>#{suggestion.mostSearched} most searched</p>
                  </>
                )} */}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-[44.5px] mt-7 mr-14 hidden justify-center lg:flex">
        <div className=" w-[1px] shrink-0 bg-indigoGray-20 " />
      </div>

      <div className="pt-8 lg:mr-12 lg:pt-0">
        <div className="mb-3 flex text-xs font-medium text-indigoGray-50">
          <h2>BADGE SEARCH SUGGESTIONS</h2>
        </div>

        <div className="font-inter px-2 font-medium">
          <ul className="mb-4">
            {badgeSuggestions.map((badge, index) => (
              <li
                key={index}
                className=" mb-4 flex cursor-pointer items-center"
                onClick={() => handleSearch('badges', badge.slug)}
              >
                <div className="mr-4 flex">
                  <Image
                    src={badge.img}
                    width={24}
                    height={38}
                    layout="fixed"
                    alt="badge"
                  />
                </div>

                <div>
                  <p className=" text-base font-semibold text-indigoGray-90">
                    {badge.title}
                  </p>

                  <p className="text-sm text-indigoGray-60">{badge.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* <div className="flex">
            <div className="mr-4 w-6" aria-hidden={true} />
            <BadgeModal
              triggerButton={
                <button
                  type="button"
                  className="flex items-center text-xs text-indigo-600"
                >
                  <span className="mr-2">See more badges</span>
                  <Image
                    src="/icons/arrow-right-indigo.svg"
                    width={16}
                    height={16}
                    alt="arrow-right"
                  />
                </button>
              }
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
