import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'wagmi';

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
  <Provider>
    <OnboardingLayout {...args} />
  </Provider>
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
