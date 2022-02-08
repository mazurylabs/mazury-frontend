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
  innerLeftContent: <h1>Inner left</h1>,
  innerRightContent: <h1>Inner right</h1>,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  sidebarContent: <Sidebar />,
  innerLeftContent: <h1>Inner left</h1>,
  innerRightContent: <h1>Inner right</h1>,
  headerContent: <h1>header</h1>,
};
