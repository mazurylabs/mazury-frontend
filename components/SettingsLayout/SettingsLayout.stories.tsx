import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import { Provider } from 'wagmi';

import { SettingsLayout } from './SettingsLayout';

export default {
  title: 'Components/SettingsLayout',
  component: SettingsLayout,
  argTypes: {
    content: { control: { type: 'text' } },
  },
} as ComponentMeta<typeof SettingsLayout>;

const Template: ComponentStory<typeof SettingsLayout> = (args) => (
  <Provider>
    <SettingsLayout {...args} />
  </Provider>
);

export const Default = Template.bind({});
Default.args = {}; //Shows Index page

export const WithContent = Template.bind({});
WithContent.args = {
  content: (
    <div>
      <h1>Content</h1>
    </div>
  ),
};
