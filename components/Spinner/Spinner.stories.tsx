import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Spinner } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  size: 64,
};
