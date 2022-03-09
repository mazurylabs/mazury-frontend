import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import { Role } from 'types';

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
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const handleRoleClick = (role: Role) => {
    setSelectedRoles(
      selectedRoles.includes(role)
        ? selectedRoles.filter((r) => r !== role)
        : [...selectedRoles, role]
    );
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      <Template
        role="role_developer"
        iconSrc="/icons/roles/developer.svg"
        coloredSrc="/icons/roles/colored/developer.svg"
        onClick={() => handleRoleClick('role_developer')}
        selected={selectedRoles.includes('role_developer')}
      />
      <Template
        role="role_designer"
        iconSrc="/icons/roles/designer.svg"
        coloredSrc="/icons/roles/colored/designer.svg"
        onClick={() => handleRoleClick('role_designer')}
        selected={selectedRoles.includes('role_designer')}
      />
      <Template
        role="role_trader"
        iconSrc="/icons/roles/trader.svg"
        coloredSrc="/icons/roles/colored/trader.svg"
        onClick={() => handleRoleClick('role_trader')}
        selected={selectedRoles.includes('role_trader')}
      />
      <Template
        role="role_creator"
        iconSrc="/icons/roles/creator.svg"
        coloredSrc="/icons/roles/colored/creator.svg"
        onClick={() => handleRoleClick('role_creator')}
        selected={selectedRoles.includes('role_creator')}
      />
      <Template
        role="role_researcher"
        iconSrc="/icons/roles/researcher.svg"
        coloredSrc="/icons/roles/colored/researcher.svg"
        onClick={() => handleRoleClick('role_researcher')}
        selected={selectedRoles.includes('role_researcher')}
      />
      <Template
        role="role_investor"
        iconSrc="/icons/roles/investor.svg"
        coloredSrc="/icons/roles/colored/investor.svg"
        onClick={() => handleRoleClick('role_investor')}
        selected={selectedRoles.includes('role_investor')}
      />
      <Template
        role="role_community_manager"
        iconSrc="/icons/roles/community.svg"
        coloredSrc="/icons/roles/colored/community.svg"
        onClick={() => handleRoleClick('role_community_manager')}
        selected={selectedRoles.includes('role_community_manager')}
      />
    </div>
  );
};
