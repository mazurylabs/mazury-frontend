import { Layout, Pill, Sidebar, Skeleton } from 'components';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { FC, Ref } from 'react';
import type { ProfileSection } from 'types';
import { colors, sectionToColor } from 'utils';

interface ProfilePageLoadingStateProps {
  shouldCollapseHeader: boolean;
  headerRef: Ref<HTMLHRElement>;
  profileSections: ProfileSection[];
  activeSection: ProfileSection;
  handleSectionClick: (section: ProfileSection) => void;
  activityRef: Ref<HTMLHeadingElement>;
  altActivityRef: Ref<HTMLHeadingElement>;
  badgesRef: Ref<HTMLHeadingElement>;
  referralsRef: Ref<HTMLHeadingElement>;
  writingRef: Ref<HTMLHeadingElement>;
}

export const ProfilePageLoadingState: FC<ProfilePageLoadingStateProps> = ({
  shouldCollapseHeader,
  headerRef,
  profileSections,
  activeSection,
  handleSectionClick,
  activityRef,
  altActivityRef,
  badgesRef,
  referralsRef,
  writingRef,
}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Mazury</title>
      </Head>
      <Layout
        sidebarContent={<Sidebar />}
        headerContent={
          <div className="sticky top-0 left-0 z-10 bg-white">
            <div className="hidden items-center gap-4 py-4 px-[39.5px] md:flex">
              <Image
                onClick={() => router.back()}
                className="hover:cursor-pointer"
                src="/icons/back.svg"
                alt="Back"
                width={16}
                height={16}
              />
              <Skeleton />

              {/* Write referral button, large screens */}
              <Skeleton />
            </div>

            <div className="flex w-full items-center gap-8 rounded-none bg-indigoGray-10 px-4 py-6 transition duration-1000 ease-in-out md:rounded-2xl md:px-[39.5px] md:py-6">
              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex w-full items-center gap-4 md:hidden">
                    <Image
                      onClick={() => router.back()}
                      className="hover:cursor-pointer"
                      src="/icons/back.svg"
                      alt="Back"
                      width={16}
                      height={16}
                    />
                    <Skeleton
                      className="w-[120px]"
                      backgroundColor={colors.indigoGray[30]}
                    />

                    {/* Write referral button, small screens */}
                    <Skeleton
                      className="ml-auto w-[120px]"
                      backgroundColor={colors.indigoGray[30]}
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-6">
                    <Skeleton
                      variant="circle"
                      heightClassName="h-[100px]"
                      widthClassName="w-[100px]"
                      innerClassName="border-[1.5px] border-indigoGray-30"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-4">
                        <Skeleton
                          className="w-[120px]"
                          backgroundColor={colors.indigoGray[30]}
                        />
                      </div>

                      {/* <h3
                        className={`text-indigoGray-40 md:hidden ${
                          shouldCollapseHeader ? 'text-sm' : 'text-lg'
                        }`}
                      >
                        Michael Scott
                      </h3> */}

                      <div className="flex items-center">
                        <p
                          className={`mr-2 text-indigoGray-70 md:block ${
                            shouldCollapseHeader
                              ? 'hidden text-sm'
                              : 'text-base'
                          }`}
                        >
                          <Skeleton className="mt-1 w-[140px]" />
                          <Skeleton className="mt-1 w-[140px]" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Skeleton className="w-[200px]" />

                <div
                  className={`no-scrollbar w-full gap-6 overflow-x-scroll md:overflow-auto ${
                    shouldCollapseHeader ? 'hidden' : 'flex'
                  }`}
                >
                  <Skeleton className="w-[80px]" />
                  <Skeleton className="w-[80px]" />
                  <Skeleton className="w-[80px]" />
                </div>

                <div
                  className={`flex gap-4 lg:hidden ${
                    shouldCollapseHeader && 'hidden'
                  }`}
                >
                  <Skeleton className="w-[80px]" />
                  <Skeleton className="w-[80px]" />
                  <Skeleton className="w-[80px]" />
                </div>
              </div>

              <div className="ml-auto hidden gap-16 pr-24 lg:flex">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            </div>

            <div
              className={`no-scrollbar mt-4 flex gap-4 overflow-x-scroll px-4 text-sm font-medium md:overflow-x-auto lg:px-[39.5px] ${
                shouldCollapseHeader && 'hidden md:flex'
              }`}
            >
              <Skeleton className="w-[80px]" />
              <Skeleton className="w-[80px]" />
              <Skeleton className="w-[80px]" />
            </div>

            <hr
              className={`${
                shouldCollapseHeader && 'mt-0 md:mt-4'
              } mt-4 mb-0 border-indigoGray-20 md:mt-4`}
            />

            <div className="no-scrollbar flex gap-4 overflow-x-scroll px-4 py-4 font-serif text-lg font-bold md:hidden">
              {profileSections.map((item) => {
                // We have temporarily removed the DAOs section
                if (item === 'DAOs') {
                  return null;
                }
                return (
                  <button
                    key={`${item}-mobile-nav`}
                    className={`${
                      activeSection === item
                        ? 'text-indigoGray-90'
                        : 'text-indigoGray-30'
                    }`}
                    onClick={() => handleSectionClick(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <hr ref={headerRef} />
          </div>
        }
        innerLeftContent={
          <div
            className={`sticky left-0 top-[16.5rem] flex h-fit flex-col justify-start gap-4`}
          >
            {profileSections.map((sectionName) => {
              // We have temporarily removed the DAOs section
              if (sectionName === 'DAOs') {
                return null;
              }
              return (
                <Pill
                  className="mx-auto w-[150px] justify-start"
                  key={sectionName}
                  isNav
                  label={sectionName}
                  active={sectionName === activeSection}
                  color={sectionToColor[sectionName]}
                  onClick={() => {
                    handleSectionClick(sectionName);
                  }}
                />
              );
            })}
          </div>
        }
        innerRightContent={
          <div className="pb-4">
            <div>
              <h3
                id="activity"
                ref={activityRef}
                className="hidden font-serif text-3xl font-bold text-indigoGray-90 md:block"
              >
                Activity
              </h3>
              <div
                id="activity-alt"
                ref={altActivityRef}
                className="mt-0 flex flex-col gap-6 md:mt-8 xl:w-10/12"
              >
                <ActivitySkeleton />
                <ActivitySkeleton />
                <ActivitySkeleton />
                <ActivitySkeleton />
              </div>
            </div>

            <div>
              <h3 className="mt-12 font-serif text-xl font-bold text-indigoGray-90">
                Recent referrals
              </h3>
              <div className="mt-4 grid w-full grid-cols-1 gap-6 lg:grid-cols-2 xl:w-10/12">
                <ReferralSkeleton />
                <ReferralSkeleton />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

const ActivitySkeleton = () => {
  return (
    <div className="flex w-full items-center">
      <Skeleton variant="circle" widthClassName="w-16" heightClassName="h-16" />

      <div className="ml-6 flex w-full flex-col">
        <Skeleton
          className="w-[80px]"
          backgroundColor={colors.indigoGray[30]}
        />

        <Skeleton className="mt-[2px] w-full" />
      </div>
    </div>
  );
};

const ReferralSkeleton = () => {
  return <Skeleton className="w-full" heightClassName="h-[80px]" />;
};
