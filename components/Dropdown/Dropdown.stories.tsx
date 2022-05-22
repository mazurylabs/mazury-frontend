import { ComponentMeta } from '@storybook/react';
import { Button, Input } from 'components';
import React, { useState } from 'react';

import { Dropdown } from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

export const Default = () => {
  return (
    <Dropdown label="Label">
      <div>Content</div>
    </Dropdown>
  );
};
