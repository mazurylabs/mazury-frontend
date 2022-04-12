import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaTwitter } from 'react-icons/fa';

import { SocialButton } from './SocialButton';

export default {
  title: 'Components/SocialButton',
  component: SocialButton,
  argTypes: {},
} as ComponentMeta<typeof SocialButton>;

const Template: ComponentStory<typeof SocialButton> = (args) => (
  <SocialButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  icon: (
    <FaTwitter
      width="20px"
      height="20px"
      className="border-1.33px border-indigoGray-5"
    />
  ),
  label: 'Twitter',
  backgroundColor: '#4A99E9',
  className: 'w-[300px]',
};

export const Secondary = Template.bind({});
Secondary.args = {
  icon: (
    <FaTwitter
      width="20px"
      height="20px"
      className="border-1.33px border-indigoGray-5"
    />
  ),
  label: 'Twitter',
  backgroundColor: '#4A99E9',
  className: 'w-[300px]',
  variant: 'secondary',
};
