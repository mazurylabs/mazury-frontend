import * as React from 'react';
import SVG from 'react-inlinesvg';
import { NextPageContext } from 'next';
import Link from 'next/link';

import { Button, Layout } from 'components';
import clsx from 'clsx';
import { convertUnicode } from '@/utils';

const plans: Plan[] = [
  {
    active: true,
    title: 'Talent',
    description:
      'Built for web3 professionals who want to build their web3 presence',
    isNewFeature: false,
    features: [
      'Full search experience',
      'Guidance to help you level up your online presence',
      'Apply to Mazury Opportunities such as job openings, events and others',
    ],
  },
  {
    active: false,
    title: 'Individual recruiter',
    description: 'For freelancers and one-person recruiting departments',
    isNewFeature: true,
    price: '$259',
    discountedPrice: '$100',
    features: [
      'Full search experience',
      'Save candidates into projects and contact them on Mazury',
      'Create Mazury Opportunities with no limits',
    ],
  },
  {
    active: false,
    title: 'Team',
    description: 'Perfect for cooperating on projects for up to 3 recruiters',
    isNewFeature: true,
    price: '$390',
    discountedPrice: '$150',
    features: [
      'All Individual recruiter features',
      'Sharing and cooperating on projects',
    ],
  },
  {
    active: false,
    title: 'Enterprise',
    description:
      'Personalised support and on-demand features for the most demanding teams',
    features: [
      'Support from our core team',
      'On-demand features that will be introduced into the product',
      'Access to beta features',
    ],
  },
];

const PricingPlans = () => {
  return (
    <Layout
      variant="plain"
      showMobileSidebar={false}
      className="!px-4 lg:!px-0"
    >
      <div className="flex flex-col w-full lg:items-center pb-4 pt-6 lg:px-0">
        <div className="w-full xl:w-[1200px] space-y-6 lg:space-y-4">
          <div className="flex items-center space-x-2 text-indigoGray-90 xl:pb-5">
            <Link href={'/settings'} className="h-6 w-6">
              <SVG className="h-6 w-6" src="/icons/chevron-left.svg" />
            </Link>
            <h1 className="font-sans text-2xl font-normal">
              Choose your pricing plan
            </h1>
          </div>
          <div className="border border-indigoGray-20 px-10 xl:py-8 w-full rounded-xl divide-y xl:divide-y-0 xl:space-y-0 xl:space-x-14 flex flex-col xl:flex-row">
            {plans.map((plan) => (
              <Plan {...plan} key={plan.title} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPlans;

interface Plan {
  title: 'Talent' | 'Individual recruiter' | 'Team' | 'Enterprise';
  description: string;
  isNewFeature?: boolean;
  features: string[];
  price?: string;
  discountedPrice?: string;
  active: boolean;
}

const Plan: React.FC<Plan> = ({
  title,
  description,
  isNewFeature,
  features,
  price,
  discountedPrice,
  active,
}) => {
  return (
    <div className="space-y-6 flex-1 py-8 xl:py-0">
      {isNewFeature && (
        <div className="py-[2px] px-2 text-green-600 border border-green-600 rounded-md w-fit">
          <p className="font-sans text-xs font-normal">New features</p>
        </div>
      )}

      <p
        className={clsx(
          'font-sans text-2xl text-indigoGray-90',
          !isNewFeature && 'mt-0 xl:mt-12'
        )}
      >
        {title}
      </p>

      <p className="text-indigoGray-90 font-sans font-light h-[63px]">
        {description}
      </p>

      {title === 'Enterprise' || title === 'Talent' ? (
        <p className="font-sans font-light text-indigoGray-90">
          {title === 'Talent' ? 'Free forever' : 'Per company basis'}
        </p>
      ) : (
        <p className="font-sans font-light text-indigoGray-90">
          {price}{' '}
          <span className="line-through text-indigoGray-40">
            {discountedPrice}
          </span>{' '}
          / month
        </p>
      )}

      <Button
        disabled={active}
        className="w-full"
        variant={title === 'Individual recruiter' ? 'primary' : 'secondary'}
      >
        {active
          ? 'Your active plan'
          : title === 'Individual recruiter'
          ? '30-day free trial'
          : title === 'Enterprise'
          ? 'Contact us'
          : 'Choose plan '}
      </Button>

      <div className="space-y-4 xl:min-h-[161px]">
        {features.map((feature) => (
          <div className="flex items-start space-x-2" key={feature}>
            <SVG src="/icons/checked.svg" className="shrink-0" />
            <p className="text-sm font-light">{feature}</p>
          </div>
        ))}
      </div>

      {discountedPrice && (
        <p className="hidden lg:block text-center font-sans text-xs font-light text-indigoGray-50">
          Discounted price is a limited offer. Users who sign up during the
          offer will see their price lowered for 6 months.
        </p>
      )}
    </div>
  );
};
