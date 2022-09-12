import { ComponentMeta } from '@storybook/react';
import { Button, Input } from 'components';
import React, { useState } from 'react';
import JobApplyModal from '../JobApplyModal';

import { SideModal } from './SideModal';

export default {
  title: 'Components/SideModal',
  component: SideModal,
  argTypes: {},
} as ComponentMeta<typeof SideModal>;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Side Modal</Button>

      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <JobApplyModal />
      </SideModal>
    </div>
  );
};
