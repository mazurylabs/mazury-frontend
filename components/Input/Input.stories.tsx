import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';

import { Input } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    id: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    type: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('');

  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'input-1',
  placeholder: 'Placeholder',
  label: 'Label',
  type: 'text',
};
