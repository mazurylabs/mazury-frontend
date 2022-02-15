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
    <div className="h-screen border border-dashed border-emerald-500" />
  ),
  innerRightContent: (
    <div className="h-screen border border-dashed border-fuchsia-500" />
  ),
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  sidebarContent: <Sidebar />,
  innerLeftContent: (
    <div className="h-screen border border-dashed border-emerald-500" />
  ),
  innerRightContent: (
    <div className="h-screen border border-dashed border-fuchsia-500" />
  ),
  headerContent: (
    <div className="sticky top-0 h-32 rounded-lg bg-blue-400 shadow-lg" />
  ),
};
