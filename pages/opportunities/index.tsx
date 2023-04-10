import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import { Button, Layout } from 'components';
import { truncateString } from 'utils';
import { useMobile } from 'hooks';

const Opportunities = () => {
  const isMobile = useMobile();
  const router = useRouter();

  return (
    <Layout variant="plain" className="!px-4 lg:!px-0">
      <div className="flex flex-col w-full lg:items-center pt-6 lg:px-0 xl:pt-16">
        <div className="lg:w-[1000px] space-y-4">
          <h1 className="font-demi text-4xl text-indigoGray-90">
            Search for opportunities
          </h1>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <Button size="medium" className="max-w-[66px] max-h-[37px]">
                All <span>18</span>
              </Button>
              <Button
                size="large"
                className="max-w-[66px] font-medium max-h-[37px]"
                variant="tertiary"
              >
                All <span className="text-indigoGray-40">18</span>
              </Button>
              <Button
                size="large"
                className="max-w-[66px] font-medium max-h-[37px]"
                variant="tertiary"
              >
                All <span className="text-indigoGray-40">18</span>
              </Button>
            </div>

            <div className="p-2 pl-3 space-x-4 flex items-center rounded-lg bg-indigoGray-5">
              <SVG src="/icons/search.svg" className="h-6 w-6" />
              <input
                type="text"
                placeholder="Search"
                aria-label="Search"
                className="grow bg-transparent"
              />
            </div>

            <div className="space-y-3">
              <div className="py-3 px-6 bg-indigoGray-5 space-y-3 rounded-lg">
                <div className="flex space-x-3">
                  <SVG src="/icons/dummy-badge.svg" className="h-10 w-10" />
                  <div className="space-y-1">
                    <p className="font-semibold font-sans text-sm text-indigoGray-90">
                      Uniswap
                    </p>
                    <p className="font-sans text-sm text-indigoGray-90">
                      {truncateString(
                        `The Uniswap Protocol is the largest decentralized trading and automated market making protocol (often called a DEX, “Decentralized Exchange”) on Ethereum.
                        The Uniswap Labs team was a major contributor to the Uniswap Protocol and now focuses on building a suite of products to support the Uniswap ecosystem. Our team is one of the most impactful in crypto. We are based out of SoHo in New York City with the option to be partially or fully remote depending on the position.`,
                        isMobile ? 62 : 170
                      )}
                    </p>
                    <div className="flex items-center space-x-2">
                      <SVG src="/icons/user.svg" className="w-4 h-4" />
                      <p className="font-sans text-xs font-medium text-indigoGray-90">
                        150-200 people work here
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2 px-4 border border-indigoGray-20 rounded-md">
                  <div className=" font-sans font-medium flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={clsx(
                          'py-[2px] px-2 rounded-[32px]',
                          true ? 'bg-sky-600' : 'bg-teal-600'
                        )}
                      >
                        <p className="text-indigoGray-5 text-xs">Job</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-indigoGray-90">
                          Lead Technical Recruiter - US Remote (ET) (contract)
                          at Uniswap
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-indigoGray-40">
                          <p className="flex items-center">
                            <SVG
                              src="/icons/location.svg"
                              className="h-4 w-4 mr-1"
                            />
                            NYC
                          </p>

                          <p>Remote</p>

                          <p className="flex items-center">
                            <SVG
                              src="/icons/history-alt.svg"
                              className="h-4 w-4 mr-1"
                            />
                            Yesterday
                          </p>

                          <p>$180,000-$220,000</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push(`/opportunities/123`)}
                      className="max-h-[29px]"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>

              <div className="py-3 px-6 bg-indigoGray-5 space-y-3 rounded-lg">
                <div className="flex space-x-3">
                  <SVG src="/icons/dummy-badge.svg" className="h-10 w-10" />
                  <div className="space-y-1">
                    <p className="font-semibold font-sans text-sm text-indigoGray-90">
                      Polygon Labs
                    </p>
                    <p className="font-sans text-sm text-indigoGray-90">
                      {truncateString(
                        `Polygon Labs, a development and growth team for the Polygon protocols.  The execution layer of the internet, scaling Ethereum for mass adoption.`,
                        isMobile ? 62 : 170
                      )}
                    </p>
                    <div className="flex items-center space-x-2">
                      <SVG src="/icons/user.svg" className="w-4 h-4" />
                      <p className="font-sans text-xs font-medium text-indigoGray-90">
                        200+ people work here
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2 px-4 border border-indigoGray-20 rounded-md">
                  <div className=" font-sans font-medium flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={clsx(
                          'py-[2px] px-2 rounded-[32px]',
                          false ? 'bg-sky-600' : 'bg-teal-600'
                        )}
                      >
                        <p className="text-indigoGray-5 text-xs">
                          Other opportunity
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-indigoGray-90">
                          The Pit Hacker House at ETHDenver 2023
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-indigoGray-40">
                          <p className="flex items-center">
                            <SVG
                              src="/icons/location.svg"
                              className="h-4 w-4 mr-1"
                            />
                            Metaverse
                          </p>

                          <p>Remote</p>

                          <p className="flex items-center">
                            <SVG
                              src="/icons/history-alt.svg"
                              className="h-4 w-4 mr-1"
                            />
                            Yesterday
                          </p>

                          <p>$180,000-$220,000</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push(`/opportunities/123`)}
                      className="max-h-[29px]"
                    >
                      Apply
                    </Button>
                  </div>

                  <div className="h-[1px] w-full bg-indigoGray-20 my-3" />

                  <div className=" font-sans font-medium flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={clsx(
                          'py-[2px] px-2 rounded-[32px]',
                          false ? 'bg-sky-600' : 'bg-teal-600'
                        )}
                      >
                        <p className="text-indigoGray-5 text-xs">
                          Other opportunity
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-indigoGray-90">
                          Lead Technical Recruiter - US Remote (ET) (contract)
                          at Uniswap
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-indigoGray-40">
                          <p className="flex items-center">
                            <SVG
                              src="/icons/location.svg"
                              className="h-4 w-4 mr-1"
                            />
                            NYC
                          </p>

                          <p>Remote</p>

                          <p className="flex items-center">
                            <SVG
                              src="/icons/history-alt.svg"
                              className="h-4 w-4 mr-1"
                            />
                            Yesterday
                          </p>

                          <p>$180,000-$220,000</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push(`/opportunities/123`)}
                      className="max-h-[29px]"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Opportunities;
