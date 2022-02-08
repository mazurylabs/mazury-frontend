import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Sidebar } from '../Sidebar';

import { Layout } from './Layout';

export default {
  title: 'Components/Layout',
  component: Layout,
  argTypes: {
    sidebarContent: {
      control: { type: 'text' },
    },
    innerLeftContent: {
      control: { type: 'text' },
    },
    innerRightContent: {
      control: { type: 'text' },
    },
    headerContent: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  sidebarContent: <Sidebar />,
  innerLeftContent: (
    <div className='h-screen border-dashed border-emerald-500 border' />
  ),
  innerRightContent: (
    <div className='h-screen border-dashed border-fuchsia-500 border' />
  ),
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  sidebarContent: <Sidebar />,
  innerLeftContent: (
    <div className='h-screen border-dashed border-emerald-500 border' />
  ),
  innerRightContent: (
    <div className='h-screen border-dashed border-fuchsia-500 border' />
  ),
  headerContent: (
    <div className='h-32 sticky top-0 bg-blue-400 shadow-lg rounded-lg' />
  ),
};
