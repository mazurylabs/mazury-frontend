import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { HiSearch } from 'react-icons/hi';

import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: (
    <div className="flex items-center gap-2">
      <HiSearch />
      <span>Search</span>
    </div>
  ),
};
