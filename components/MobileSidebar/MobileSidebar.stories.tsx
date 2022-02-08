import { ComponentMeta, ComponentStory } from '@storybook/react';
import Link from 'next/link';
import React from 'react';
import { MobileSidebar } from './MobileSidebar';

export default {
  title: 'Components/MobileSidebar',
  component: MobileSidebar,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof MobileSidebar>;

const Template: ComponentStory<typeof MobileSidebar> = (args) => (
  <MobileSidebar {...args} />
);

export const Default = Template.bind({});
Default.args = {};
