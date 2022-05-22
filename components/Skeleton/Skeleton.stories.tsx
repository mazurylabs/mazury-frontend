import { ComponentMeta, ComponentStory } from '@storybook/react';
import { colors } from 'utils';

import { Skeleton } from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    children: {
      className: { type: 'text' },
      backgroundColor: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Rectangle = Template.bind({});
Rectangle.args = {
  className: 'w-32',
};

export const Circle = Template.bind({});
Circle.args = {
  className: 'w-32',
  variant: 'circle',
  heightClassName: 'h-8',
  widthClassName: 'w-8',
};
