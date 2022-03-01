import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';

import { Checkbox } from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    id: { control: { type: 'text' } },
    label: { control: { type: 'text' } },
    checked: { control: { type: 'boolean' } },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [value, setValue] = useState<boolean>(false);

  return <Checkbox {...args} checked={value} setChecked={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'Checkbox-1',
  label: 'Label',
};
