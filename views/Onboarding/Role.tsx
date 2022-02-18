import { OnboardingLayout, RoleCard } from 'components';
import { FC, useState } from 'react';
import { TrimmedRole } from 'types';

export const RoleView: FC = () => {
  const [selectedRoles, setSelectedRoles] = useState<TrimmedRole[]>([]);

  const handleRoleClick = (role: TrimmedRole) => {
    setSelectedRoles(
      selectedRoles.includes(role)
        ? selectedRoles.filter((r) => r !== role)
        : [...selectedRoles, role]
    );
  };

  return (
    <OnboardingLayout firstHeading="ROLE" secondHeading="What's your role?">
      <div className="mt-6 flex flex-col">
        <div className="grid grid-cols-3 gap-3">
          <RoleCard
            role="developer"
            iconSrc="/icons/roles/developer.svg"
            coloredSrc="/icons/roles/colored/developer.svg"
            onClick={() => handleRoleClick('developer')}
            selected={selectedRoles.includes('developer')}
          />
          <RoleCard
            role="designer"
            iconSrc="/icons/roles/designer.svg"
            coloredSrc="/icons/roles/colored/designer.svg"
            onClick={() => handleRoleClick('designer')}
            selected={selectedRoles.includes('designer')}
          />
          <RoleCard
            role="trader"
            iconSrc="/icons/roles/trader.svg"
            coloredSrc="/icons/roles/colored/trader.svg"
            onClick={() => handleRoleClick('trader')}
            selected={selectedRoles.includes('trader')}
          />
          <RoleCard
            role="creator"
            iconSrc="/icons/roles/creator.svg"
            coloredSrc="/icons/roles/colored/creator.svg"
            onClick={() => handleRoleClick('creator')}
            selected={selectedRoles.includes('creator')}
          />
          <RoleCard
            role="researcher"
            iconSrc="/icons/roles/researcher.svg"
            coloredSrc="/icons/roles/colored/researcher.svg"
            onClick={() => handleRoleClick('researcher')}
            selected={selectedRoles.includes('researcher')}
          />
          <RoleCard
            role="investor"
            iconSrc="/icons/roles/investor.svg"
            coloredSrc="/icons/roles/colored/investor.svg"
            onClick={() => handleRoleClick('investor')}
            selected={selectedRoles.includes('investor')}
          />
          <RoleCard
            role="community_manager"
            iconSrc="/icons/roles/community.svg"
            coloredSrc="/icons/roles/colored/community.svg"
            onClick={() => handleRoleClick('community_manager')}
            selected={selectedRoles.includes('community_manager')}
          />
        </div>

        <span className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
          New projects
        </span>
        {/* TODO: Custom checkbox */}
        <div className="mt-3 flex items-center">
          <input type="checkbox" />
          <span className="ml-3 text-base font-medium text-indigoGray-70">
            I&apos;m open to contribute to new projects
          </span>
        </div>
      </div>
    </OnboardingLayout>
  );
};
