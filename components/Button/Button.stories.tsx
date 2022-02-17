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
      disabled: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'BUTTON',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'BUTTON',
  variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'BUTTON',
  variant: 'tertiary',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: (
    <>
      <HiSearch />
      <span>BUTTON</span>
    </>
  ),
};
