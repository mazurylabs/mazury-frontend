import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    children: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args} className="flex w-[300px] justify-center" />
);

export const Clickable = Template.bind({});
Clickable.args = {
  children: 'Card content',
  clickable: true,
  onClick: () => alert('Clicked!'),
};

export const NonClickable = Template.bind({});
NonClickable.args = {
  children: 'Card content',
  clickable: false,
};
