import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { colors } from 'utils';
import { Tags } from './Tags';

export default {
  title: 'Components/Tags',
  component: Tags,
  argTypes: {},
} as ComponentMeta<typeof Tags>;

const Template: ComponentStory<typeof Tags> = (args) => <Tags {...args} />;

export const Default = () => {
  const [tags, setTags] = useState([
    {
      label: 'Frontend development',
      color: colors.indigo,
      value: 'frontend',
    },
    {
      label: 'Solidity',
      color: colors.amber,
      value: 'solidity',
    },
    {
      label: 'Community',
      color: colors.emerald,
      value: 'community',
    },
  ]);

  const onRemove = (val: string) => {
    const newTags = tags.filter((tag) => tag.value !== val);
    setTags(newTags);
  };

  const onAdd = (val: string) => {
    const newTags = [...tags, { label: val, color: colors.gray, value: val }];
    setTags(newTags);
  };

  return <Tags tags={tags} onRemove={onRemove} allowInput onAdd={onAdd} />;
};
