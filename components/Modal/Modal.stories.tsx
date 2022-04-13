import { ComponentMeta } from '@storybook/react';
import { Button, Input } from 'components';
import React, { useState } from 'react';

import { Modal } from './Modal';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="font-demi text-3xl text-indigoGray-90">
          Verify Twitter link
        </h3>
        <span className="mt-2 text-indigoGray-60">
          Paste your tweet&apos;s link here to verify
        </span>

        <Input
          label="Twitter link"
          outerClassName="mt-4"
          placeholder="e.g. https://twitter.com/mazuryxyz"
        />

        <div className="mt-4 flex w-full justify-around gap-4">
          <Button variant="secondary">SKIP</Button>
          <Button variant="primary">RETRY</Button>
        </div>
      </Modal>
    </div>
  );
};
