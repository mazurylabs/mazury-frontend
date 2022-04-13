import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { Pill } from './Pill';

export default {
  title: 'Components/Pill',
  component: Pill,
  argTypes: {
    label: { control: { type: 'text' } },
    active: { control: { type: 'boolean' } },
  },
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (args) => {
  const [active, setActive] = useState(true);

  return (
    <Pill {...args} onClick={() => setActive((v) => !v)} active={active} />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Activity',
  color: 'emerald',
  isNav: true,
};
