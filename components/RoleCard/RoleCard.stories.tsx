import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { TrimmedRole } from 'types';

import { RoleCard } from './RoleCard';

export default {
  title: 'Components/RoleCard',
  component: RoleCard,
  argTypes: {
    role: {
      control: {
        type: 'text',
      },
    },
    iconSrc: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof RoleCard>;

const Template: ComponentStory<typeof RoleCard> = (args) => (
  <RoleCard {...args} />
);

export const Gallery = () => {
  const [selectedRoles, setSelectedRoles] = useState<TrimmedRole[]>([]);

  const handleRoleClick = (role: TrimmedRole) => {
    setSelectedRoles(
      selectedRoles.includes(role)
        ? selectedRoles.filter((r) => r !== role)
        : [...selectedRoles, role]
    );
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      <Template
        role="developer"
        iconSrc="/icons/roles/developer.svg"
        coloredSrc="/icons/roles/colored/developer.svg"
        onClick={() => handleRoleClick('developer')}
        selected={selectedRoles.includes('developer')}
      />
      <Template
        role="designer"
        iconSrc="/icons/roles/designer.svg"
        coloredSrc="/icons/roles/colored/designer.svg"
        onClick={() => handleRoleClick('designer')}
        selected={selectedRoles.includes('designer')}
      />
      <Template
        role="trader"
        iconSrc="/icons/roles/trader.svg"
        coloredSrc="/icons/roles/colored/trader.svg"
        onClick={() => handleRoleClick('trader')}
        selected={selectedRoles.includes('trader')}
      />
      <Template
        role="creator"
        iconSrc="/icons/roles/creator.svg"
        coloredSrc="/icons/roles/colored/creator.svg"
        onClick={() => handleRoleClick('creator')}
        selected={selectedRoles.includes('creator')}
      />
      <Template
        role="researcher"
        iconSrc="/icons/roles/researcher.svg"
        coloredSrc="/icons/roles/colored/researcher.svg"
        onClick={() => handleRoleClick('researcher')}
        selected={selectedRoles.includes('researcher')}
      />
      <Template
        role="investor"
        iconSrc="/icons/roles/investor.svg"
        coloredSrc="/icons/roles/colored/investor.svg"
        onClick={() => handleRoleClick('investor')}
        selected={selectedRoles.includes('investor')}
      />
      <Template
        role="community_manager"
        iconSrc="/icons/roles/community.svg"
        coloredSrc="/icons/roles/colored/community.svg"
        onClick={() => handleRoleClick('community_manager')}
        selected={selectedRoles.includes('community_manager')}
      />
    </div>
  );
};
