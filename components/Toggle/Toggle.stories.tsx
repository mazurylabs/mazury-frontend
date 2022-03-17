import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    isToggled: {
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof Toggle>;

export const Default = () => {
  const [active, setActive] = useState(false);

  return <Toggle isToggled={active} onToggle={setActive} />;
};
