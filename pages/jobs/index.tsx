import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Layout, Pill } from 'components';
import Image from 'next/image';
import Link from 'next/link';

type JobViews = 'founders' | 'positions';

const dummyjobs = [
  {
    logo: '/icons/dummy-company-1.svg',
    title: 'NFT x DeFi Content Writer',
    company: 'MARCOMM',
    highlighted: true,
    location: 'Remote',
    date: 'Today',
  },
  {
    logo: '/icons/dummy-company-2.svg',
    title: 'Lead Technical Recruiter - US Remote (ET) (contract) at Fractional',
    company: 'Fractional',
    highlighted: false,
    location: 'USA, Remote',
    date: 'Yesterday',
  },
  {
    logo: '/icons/dummy-company-3.svg',
    title: 'Customer Success Program Manager',
    company: 'BitGO',
    highlighted: false,
    location: 'USA, Canada, Remote',
    date: 'Last week',
  },
  {
    logo: '/icons/dummy-company-1.svg',
    title: 'NFT x DeFi Content Writer',
    company: 'MARCOMM',
    highlighted: false,
    location: 'USA, Canada, Remote',
    date: 'Last month',
  },
  {
    logo: '/icons/dummy-company-1.svg',
    title: 'NFT x DeFi Content Writer',
    company: 'MARCOMM',
    highlighted: true,
    location: 'Remote',
    date: 'Today',
  },
  {
    logo: '/icons/dummy-company-2.svg',
    title: 'Lead Technical Recruiter - US Remote (ET) (contract) at Fractional',
    company: 'Fractional',
    highlighted: false,
    location: 'USA, Remote',
    date: 'Yesterday',
  },
  {
    logo: '/icons/dummy-company-1.svg',
    title: 'Lead Technical Recruiter - US Remote (ET) (contract) at Fractional',
    company: 'Fractional',
    highlighted: false,
    location: 'Remote',
    date: 'Yesterday',
  },
  {
    logo: '/icons/dummy-company-2.svg',
    title: 'Account Executive - DACH',
    company: 'MARCOMM',
    highlighted: false,
    location: 'USA, Remote',
    date: 'Last month',
  },
  {
    logo: '/icons/dummy-company-3.svg',
    title: 'NFT x DeFi Content Writer',
    company: 'BitGO',
    highlighted: true,
    location: 'Canada, Remote',
    date: 'Last month',
  },
  {
    logo: '/icons/dummy-company-2.svg',
    title: 'Account Executive - DACH',
    company: 'MARCOMM',
    highlighted: false,
    location: 'USA, Remote',
    date: 'Last month',
  },
  {
    logo: '/icons/dummy-company-3.svg',
    title: 'NFT x DeFi Content Writer',
    company: 'BitGO',
    highlighted: true,
    location: 'Canada, Remote',
    date: 'Last month',
  },
];

const Jobs = () => {
  const [activeView, setActiveView] = React.useState<JobViews>('positions');

  const handleSelectJobView = (view: JobViews) => setActiveView(view);

  return (
    <Layout variant="plain">
      <div className="flex grow flex-col px-4 xl:mx-auto xl:max-w-[1000px]">
        <div className="sticky top-0 z-10 bg-white pt-16">
          <div className="mb-4 flex">
            <div className="grow">
              <h1 className="font-demi text-4xl text-indigoGray-90">Jobs</h1>
            </div>
            <div className="flex items-center space-x-14">
              <button type="button" className="flex items-center space-x-2">
                <div className="h-4 w-4">
                  <SVG height={16} width={16} src="/icons/link.svg" />
                </div>
                <span className="font-sans text-sm font-semibold text-teal-600">
                  Copy profile
                </span>
              </button>

              <button
                type="button"
                className="hidden font-sans text-sm font-semibold text-teal-600 lg:flex"
              >
                Talent match
              </button>
              <button
                type="button"
                className="hidden items-center space-x-2 rounded-lg bg-teal-600 p-2 text-white lg:flex"
              >
                <div className="h-4 w-4">
                  <SVG height={16} width={16} src="/icons/plus-white.svg" />
                </div>

                <span>Publish job post</span>
              </button>
            </div>
          </div>

          <div className="mb-6 flex justify-between sm:justify-start sm:space-x-7">
            <button
              type="button"
              className={`shrink-0 rounded-lg px-3 py-1 font-sans text-sm font-medium ${
                activeView === 'positions'
                  ? 'border border-pink-200 bg-pink-50 text-pink-700'
                  : 'text-indigoGray-90'
              }`}
              onClick={() => handleSelectJobView('positions')}
            >
              Open positions
            </button>

            <button
              type="button"
              className={`shrink-0 rounded-lg px-3 py-1 font-sans text-sm font-medium ${
                activeView === 'founders'
                  ? 'border border-pink-200 bg-pink-50 text-pink-700'
                  : 'text-indigoGray-90'
              }`}
              onClick={() => handleSelectJobView('founders')}
            >
              Recruiters and founders
            </button>
          </div>

          <div className="mb-6 flex items-center space-x-5 lg:space-x-[33px]">
            <form className="flex grow items-center rounded-lg bg-indigoGray-5 py-2 px-3">
              <div className="h-6 w-6">
                <SVG height={24} width={24} src={`/icons/search-black.svg`} />
              </div>

              <div className="font-inter ml-4 grow text-base font-medium">
                <input
                  type="text"
                  placeholder="Search"
                  aria-label="Search"
                  className="h-full w-full bg-transparent"
                  // value={searchTerm}
                  // onChange={handleChange}
                  // onFocus={handleFocusBlur}
                />
              </div>
            </form>

            <div className="flex items-center space-x-12">
              <button
                type="button"
                aria-label="filter"
                className="h-4 w-4 lg:hidden"
              >
                <SVG height={16} width={16} src={`/icons/filter.svg`} />
              </button>

              <button
                type="button"
                className="hidden items-center space-x-2 lg:flex"
              >
                <span className="font-sans text-sm font-semibold text-indigoGray-90">
                  Organisation
                </span>
                <div className="h-4 w-4">
                  <SVG height={16} width={16} src={`/icons/angle-down.svg`} />
                </div>
              </button>

              <button
                type="button"
                className="hidden items-center space-x-2 lg:flex"
              >
                <span className="font-sans text-sm font-semibold text-indigoGray-90">
                  Location
                </span>
                <div className="h-4 w-4">
                  <SVG height={16} width={16} src={`/icons/angle-down.svg`} />
                </div>
              </button>

              <button
                type="button"
                className="hidden items-center space-x-2 lg:flex"
              >
                <span className="font-sans text-sm font-semibold text-indigoGray-90">
                  Date of publication
                </span>
                <div className="h-4 w-4">
                  <SVG height={16} width={16} src={`/icons/angle-down.svg`} />
                </div>
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between lg:hidden">
            <button
              type="button"
              className="flex max-w-[50%] grow items-center justify-center space-x-2 rounded-lg bg-teal-600 py-2 text-white"
            >
              <div className="h-4 w-4">
                <SVG height={16} width={16} src="/icons/plus-white.svg" />
              </div>

              <span>Publish job post</span>
            </button>

            <button
              type="button"
              className="flex grow justify-center font-sans text-sm font-semibold text-teal-600"
            >
              Talent match
            </button>
          </div>
        </div>

        <div className="grow space-y-3 overflow-y-hidden pb-2">
          {dummyjobs.map((job, index) => (
            <Link href={`/jobs/${index}`}>
              <a className="relative block w-full" key={index}>
                <div className="flex items-center space-x-3 rounded-2xl border border-violet-300 bg-white px-[14px] py-4">
                  <div className="flex h-10 w-10">
                    <Image
                      height={40}
                      width={40}
                      src={job.logo}
                      layout="fixed"
                      alt={job.company}
                    />
                  </div>
                  <div className="flex grow items-center">
                    <div className="grow">
                      <div>
                        <p className="font-sans text-sm font-semibold text-indigoGray-90">
                          {job.title}
                        </p>
                      </div>
                      <div className="flex space-x-4">
                        <p className="font-sans text-xs font-medium text-teal-600">
                          {job.company}
                        </p>

                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4">
                            <SVG
                              height={16}
                              width={16}
                              src="/icons/location.svg"
                            />
                          </div>

                          <p className="font-sans text-xs font-medium text-indigoGray-40">
                            {job.location}
                          </p>
                        </div>

                        <div className="flex items-center space-x-1">
                          <div className="h-4 w-4">
                            <SVG height={16} width={16} src="/icons/time.svg" />
                          </div>
                          <p className="font-sans text-xs font-medium text-indigoGray-40">
                            {job.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    {job.highlighted && (
                      <div className="hidden lg:block">
                        <Pill
                          color="purple"
                          label="Highlighted"
                          className="max-h-[22px] py-2 pl-3 pr-4 !text-xs"
                          active
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative top-[-2.5px] z-[-1] flex w-full justify-end pr-5">
                  {job.highlighted && (
                    <div className="lg:hidden">
                      <Pill
                        color="purple"
                        label="Highlighted"
                        className="max-h-[22px] py-2 pl-3 pr-4 !text-xs"
                        active
                      />
                    </div>
                  )}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
