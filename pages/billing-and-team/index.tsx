import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NextPageContext } from 'next';
import Link from 'next/link';
import * as Popover from '@radix-ui/react-popover';

import { Avatar, Button, Layout } from 'components';
import clsx from 'clsx';
import { convertUnicode } from '@/utils';

const teamMembers = [
  { role: 'admin', name: 'Wojtek', id: '1' },
  { role: 'member', name: 'Constance de Archambault', id: '2' },
];

const BillingAndTeams = () => {
  return (
    <Layout
      variant="plain"
      showMobileSidebar={false}
      className="!px-4 lg:!px-0"
    >
      <div className="flex flex-col w-full lg:items-center pb-4 pt-6 lg:px-0">
        <div className="w-full xl:w-[1200px] space-y-6 lg:space-y-4">
          <div className="flex items-center justify-between space-x-2  pb-5">
            <h1 className="font-sans text-2xl font-normal text-indigoGray-90">
              Coinbase team
            </h1>
            <SVG src="/icons/more.svg" className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <div className="py-4 px-6 rounded-lg bg-indigoGray-5 w-full space-y-2">
              <p className="font-sans font-light text-indigoGray-90">
                Team members
              </p>

              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="py-2 px-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Avatar src="/icons/dummy-user.svg" alt={member.name} />
                    <p className="font-sans font-normal text-sm text-indigoGray-90">
                      {member.name}
                    </p>
                  </div>

                  {member.role === 'admin' ? (
                    <p className="text-indigoGray-90 font-medium text-sm flex items-center space-x-1">
                      <p>{member.role === 'admin' ? 'Admin' : 'Team member'}</p>
                      <SVG src="/icons/angle-down.svg" className="h-4 w-4" />
                    </p>
                  ) : (
                    <Popover.Root>
                      <Popover.Trigger className="text-indigoGray-90 font-medium text-sm flex items-center space-x-1">
                        <p>
                          {member.role === 'admin' ? 'Admin' : 'Team member'}
                        </p>
                        <SVG src="/icons/angle-down.svg" className="h-4 w-4" />
                      </Popover.Trigger>

                      <Popover.Portal className="z-30">
                        <Popover.Content
                          align="center"
                          sideOffset={8}
                          className="rounded-lg bg-white shadow-base border border-indigoGray-20"
                        >
                          <div className="h-fit w-[220px] p-1">
                            <button className="pl-6 py-1 font-sans font-light text-indigoGray-90 text-sm">
                              Make admin
                            </button>
                            <button className="px-6 font-sans font-light text-indigoGray-90 text-sm">
                              Remove from team
                            </button>
                          </div>
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  )}
                </div>
              ))}
            </div>

            <div className="py-4 px-6 rounded-lg bg-indigoGray-5 w-full space-y-2">
              <p className="font-sans font-light text-indigoGray-90">Billing</p>
              <div className="divide-y space-y-2">
                <div className="py-2 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm font-normal text-indigoGray-90">
                      Team plan $200/month (price lowered until 09/23)
                    </p>
                    <p className="text-indigoGray-40 font-sans text-[13px]">
                      2 team members
                    </p>
                  </div>
                  <Link
                    href="/pricing-plans"
                    className="text-sm font-medium font-sans text-indigoGray-90"
                  >
                    Change plan
                  </Link>
                </div>

                <div className="py-2 space-y-3">
                  <p className="text-indigoGray-40 font-sans text-[13px]">
                    Credit card information
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigoGray-90 font-sans font-normal text-sm">
                        **** **** **** **87
                      </p>
                      <p className="text-indigoGray-40 font-sans text-[13px]">
                        Mastercard
                      </p>
                    </div>

                    <button
                      type="button"
                      className="text-sm font-medium font-sans text-indigoGray-90"
                    >
                      Change data
                    </button>
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

export default BillingAndTeams;
