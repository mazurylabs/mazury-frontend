import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NextPageContext } from 'next';
import Link from 'next/link';
import * as Popover from '@radix-ui/react-popover';

import { Avatar, Button, Layout } from 'components';
import { truncateString } from 'utils';
import { useUser } from 'providers/react-query-auth';
import { useMobile } from 'hooks';
import { CustomInput } from 'views/Opportunities/CustomInput';
import { useRouter } from 'next/router';
import { useAlert } from 'components/Alert.tsx';
import clsx from 'clsx';

interface Props {
  opportunityId: string;
}

const Opportunity: React.FC<Props> = ({ opportunityId }) => {
  const router = useRouter();
  const { data } = useUser();
  const isMobile = useMobile(false);
  const { dispatch } = useAlert({});

  return (
    <Layout
      variant="plain"
      showMobileSidebar={false}
      className="!px-4 lg:!px-0"
    >
      <div className="flex flex-col w-full lg:items-center pt-6 lg:px-0 xl:pt-16">
        <div className="lg:w-[730px] xl:w-[1000px] space-y-6 lg:space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex space-x-3 items-center">
                <Link href={`/opportunities`} passHref>
                  <SVG src="/icons/chevron-left.svg" width={24} height={24} />
                </Link>
                <p className="font-sans font-medium text-2xl text-indigoGray-90">
                  {isMobile
                    ? truncateString('Senior frontend developer', 15)
                    : 'Senior frontend developer'}
                </p>
              </div>
              <div className="flex space-x-6">
                <div className="flex items-center space-x-3">
                  <Avatar
                    src="/icons/dummy-user.svg"
                    alt="company"
                    outerClassName="h-8 w-8"
                    className="border-[0.6px] border-indigoGray-30"
                  />
                  <p className="font-sans text-sm font-medium text-indigoGray-90">
                    Uniswap
                  </p>
                </div>
                <p className="font-sans font-medium text-sm text-indigoGray-40 flex items-center">
                  <SVG src="/icons/time.svg" className="mr-1" />
                  Today
                </p>
              </div>
            </div>

            {!'data?.is_recruiter' ? (
              <RecruiterView
                handleEdit={() =>
                  router.push(`/opportunities/${opportunityId}/edit`)
                }
                handleUnpublish={() =>
                  dispatch({ type: 'notification', message: 'Unpublished' })
                }
              />
            ) : (
              <ApplicantView />
            )}
          </div>

          {data?.is_recruiter && (
            <Button
              size="medium"
              variant="secondary"
              className="lg:hidden w-full bg-transparent"
            >
              See 3 candidates
              <SVG src="/icons/chevron-right.svg" className="h-4 w-4 ml-2" />
            </Button>
          )}

          <div className="xl:w-[700px] space-y-4 lg:space-y-6 font-sans text-sm font-medium text-indigoGray-90">
            <div className="space-y-4 p-4 border border border-indigoGray-20 rounded-lg">
              <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:space-y-0">
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Company name</p>
                  <div className="flex space-x-3">
                    <p>Uniswap</p>
                    <Link href={`#`} className=" text-indigo-600">
                      Edit company information
                    </Link>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Link</p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://boards.greenhouse.io/uniswaplabs/jobs/4003109005"
                    className="text-indigoGray-90 flex"
                  >
                    {truncateString(
                      'https://boards.greenhouse.io/uniswaplabs/jobs/4003109005',
                      40
                    )}
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-between lg:flex-row lg:space-y-0">
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Location</p>
                  <p>NYC | Remote</p>
                </div>
                <div className="space-y-2">
                  <p className="text-indigoGray-40">Company size</p>
                  <p>100-200 people work here</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-indigoGray-40">Compensation range</p>
                <p>$180,000-$220,000</p>
              </div>

              <div className="space-y-2">
                <p className="text-indigoGray-40">Company description</p>
                <p className="text-justify">
                  The Uniswap Protocol is the largest decentralized trading and
                  automated market making protocol (often called a DEX,
                  “Decentralized Exchange”) on Ethereum. The Uniswap Labs team
                  was a major contributor to the Uniswap Protocol and now
                  focuses on building a suite of products to support the Uniswap
                  ecosystem. Our team is one of the most impactful in crypto. We
                  are based out of SoHo in New York City with the option to be
                  partially or fully remote depending on the position.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-indigoGray-40">Description</p>
              <p className="text-justify">
                {`We’re looking for an enthusiastic, self-motivated engineer to
                help us build the next generation of financial products. As a
                dedicated frontend hire, you will gain ownership over our
                existing suite of web products, as well as the ability to
                influence the creation, design, and execution of future
                products. You will be responsible for ensuring a consistent,
                high-quality user experience across trading interfaces,
                data-heavy analytics pages, documentation portals and more.
                Responsibilities Create a unified component library for use
                across all Uniswap products Rapidly implement functional UI
                elements from design mocks, with an eye toward performance and
                accessibility Know when to create abstractions vs. one-off
                features Ensure that components are functional, elegant,
                performant, and mobile-friendly Understand when and how to run
                UI tests Requirements 5+ years of software engineering
                experience At least 3 years of React experience A deep
                understanding of the architecture of modern client-side React
                applications Prior experience working with component libraries
                or design teams in user-facing applications A desire to keep up
                with modern best practices in web development Nice to Have Prior
                experience creating a design system or component library
                Familiarity with the web3 frontend stack (ethers.js/web3.js,
                EIP-1193, client-side private key management, etc.) Familiarity
                with React Hooks Experience with TypeScript in React Degree in
                computer science Love for unicorns :) Minimum full-time salary
                of $180,000-$220,000. Disclosure in accordance with New York
                City's Pay Transparency Law. Full Time employees at Uniswap Labs
                are also eligible for other compensation elements, including
                equity, tokens, and benefits, dependent on the position type.
                Uniswap Labs’ benefits include unlimited and encouraged time
                off, 100% company-paid medical, dental, & vision for you and
                your dependents, 401(k) participation, annual $1,500 education
                stipend, up to 16 weeks paid parental leave, home office setup
                stipend for remote employees and daily lunches at NY
                headquarters (all benefits are subject to applicable taxes and
                based on eligibility). Uniswap Labs is proud to be an equal
                opportunity employer (EEO). We provide employment opportunities
                without regard to age, race, color, ancestry, national origin,
                religion, disability (including gender dysphoria and similar
                gender-related conditions), sex, gender identity or expression,
                sexual orientation (including actual or perceived
                heterosexuality, homosexuality, bisexuality, and asexuality),
                veteran status, military status, domestic violence victim
                status, reproductive health decision making or any other
                protected category.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Opportunity;

interface RecruiterViewProps {
  handleEdit: () => void;
  handleUnpublish: () => void;
}

const RecruiterView: React.FC<RecruiterViewProps> = ({
  handleEdit,
  handleUnpublish,
}) => {
  const isMobile = useMobile();

  return (
    <Popover.Root>
      <div className="flex items-center space-x-4">
        <Popover.Trigger asChild className="relative">
          <button type="button" aria-label="comments">
            <SVG src="/icons/more.svg" className="mr-1" />
          </button>
        </Popover.Trigger>
        <Button disabled size="medium" className="hidden h-[37px] lg:flex">
          <SVG src="/icons/user.svg" className="mr-2 h-4 w-4" />0 applications
        </Button>
      </div>

      <Popover.Portal>
        <Popover.Content
          align={isMobile ? 'end' : 'center'}
          sideOffset={10}
          className="h-[63px] w-[220px]"
        >
          <div className="flex flex-col p-[6.5px] space-y-[6.5px] items-start h-full w-full flex-col rounded-lg bg-white shadow-base font-sans text-sm text-indigoGray-90">
            <button
              type="button"
              className="pl-[30px] grow"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              type="button"
              className="pl-[30px] grow"
              onClick={handleUnpublish}
            >
              Unpublish
            </button>
          </div>
          <Popover.Arrow fill="white" className="drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const ApplicantView = () => {
  const isSuccess = false;
  const isMobile = useMobile();

  return (
    <Popover.Root>
      <Popover.Trigger className="fixed left-0 bottom-0 py-2 lg:relative">
        <Button className="mx-4 lg:mx-0 mb-4 lg:mb-0 w-[calc(100vw-32px)] lg:w-[211px]">
          Apply
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align={isMobile ? 'center' : 'end'}
          alignOffset={-15}
          sideOffset={0}
          className={clsx(
            isSuccess &&
              'lg:rounded-lg lg:bg-white lg:shadow-base lg:border-[0.6px]'
          )}
        >
          {isSuccess ? (
            <div className="h-[calc(100vh-90px)] lg:h-fit max-w-[370px] flex items-center">
              <div className="rounded-lg bg-white shadow-base border-[0.6px] lg:rounded-none lg:bg-transparent lg:shadow-none lg:border-none">
                <div className="p-4 pb-0">
                  <div className="sticky top-0 flex justify-end">
                    <Popover.Close aria-label="Close">
                      <SVG src="/icons/x.svg" className="h-4 w-4" />
                    </Popover.Close>
                  </div>
                </div>

                <div className="font-sans font-medium space-y-2 px-8 py-10 flex flex-col items-center">
                  <SVG src="/icons/success.svg" className="h-[60px] w-[60px]" />
                  <p className="text-2xl text-indigoGray-90">
                    Application sent
                  </p>
                  <p className="text-indigoGray-60 text-sm text-center">
                    You will be contacted by the publisher of the post
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="before:bg-[rgba(255, 255, 255, 0.7)] h-[calc(100vh-90px)] flex flex-col justify-center lg:h-fit lg:block before:absolute before:top-0 before:left-0 before:h-full before:w-full before:opacity-50 backdrop-blur-[5px]">
              <div className="rounded-lg bg-white shadow-base border-red-200">
                <div className="p-4 pb-0">
                  <div className="sticky top-0 flex justify-end">
                    <Popover.Close aria-label="Close">
                      <SVG src="/icons/x.svg" className="h-4 w-4" />
                    </Popover.Close>
                  </div>

                  <p className="font-sans text-base font-medium text-indigoGray-90">
                    Apply
                  </p>
                </div>

                <form className="flex flex-col relative w-[calc(100vw-32px)] lg:h-[392px] lg:w-[460px] overflow-y-auto">
                  <div className="space-y-4 mb-4 mt-4 px-4">
                    <CustomInput label="Email" placeholder="Insert salary" />
                    <CustomInput
                      label="Resume"
                      placeholder="Insert salary"
                      required={false}
                    />
                    <CustomInput
                      label="Website"
                      placeholder="Insert salary"
                      info="Own website, Twitter, discord or any other"
                      required={false}
                    />

                    <div className="space-y-1 grow min-h-[229px] flex flex-col">
                      <p className="font-sans text-sm text-indigoGray-40">
                        Message
                      </p>
                      <textarea
                        placeholder="Hi! I’m sending my application. Thanks for your time"
                        className="w-full grow border rounded-lg border-indigoGray-20 grow resize-none bg-transparent px-4 py-3 font-sans text-sm text-indigoGray-90"
                      />
                    </div>
                  </div>

                  <Button
                    size="large"
                    className="rounded-t-none sticky w-full left-0 bottom-0"
                    type="submit"
                    loading={false}
                  >
                    Send request
                  </Button>
                </form>
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      opportunityId: context.query.opportunityId,
    },
  };
};
