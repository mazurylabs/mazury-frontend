import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { TagItem } from './TagItem';
import { theme } from '../../tailwind.config';

const colors = theme.extend.colors;

export default {
  title: 'Components/TagItem',
  component: TagItem,
  argTypes: {},
} as ComponentMeta<typeof TagItem>;

const Template: ComponentStory<typeof TagItem> = (args) => (
  <TagItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Frontend development',
  color: colors.indigo,
  onRemove: () => alert('Removed'),
  value: 'frontend',
};
