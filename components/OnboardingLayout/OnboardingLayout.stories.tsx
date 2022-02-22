import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'components';
import * as React from 'react';
import { useState } from 'react';

import { OnboardingLayout } from './OnboardingLayout';

export default {
  title: 'Components/OnboardingLayout',
  component: OnboardingLayout,
  argTypes: {
    firstHeading: { control: { type: 'text' } },
    secondHeading: { control: { type: 'text' } },
    bottomContent: { control: { type: 'text' } },
    children: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof OnboardingLayout>;

const Template: ComponentStory<typeof OnboardingLayout> = (args) => (
  <OnboardingLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  firstHeading: 'Welcome to your new account',
  secondHeading: 'wojtek.eth',
  children: (
    <div className="mt-6 flex flex-col">
      <h1>Hello</h1>
    </div>
  ),
};
