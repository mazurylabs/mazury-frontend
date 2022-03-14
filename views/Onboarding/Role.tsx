import { Checkbox, OnboardingLayout, RoleCard } from 'components';
import { OnboardingContext } from 'contexts';
import { FC, useContext, useState } from 'react';
import { Role } from 'types';

export const RoleView: FC = () => {
  const { formData, setFormData } = useContext(OnboardingContext);

  const handleRoleClick = (role: Role) => {
    setFormData({
      ...formData,
      [role]: !formData[role],
    });
  };

  const handleCheckClick = (v: boolean) => {
    setFormData({ ...formData, open_to_opportunities: v });
  };

  return (
    <OnboardingLayout firstHeading="ROLE" secondHeading="What's your role?">
      <div className="mt-6 flex flex-col">
        <div className="grid grid-cols-3 gap-3">
          <RoleCard
            role="role_developer"
            iconSrc="/icons/roles/developer.svg"
            coloredSrc="/icons/roles/colored/developer.svg"
            onClick={() => handleRoleClick('role_developer')}
            selected={formData.role_developer}
            className="h-[118px]"
          />
          <RoleCard
            role="role_designer"
            iconSrc="/icons/roles/designer.svg"
            coloredSrc="/icons/roles/colored/designer.svg"
            onClick={() => handleRoleClick('role_designer')}
            selected={formData.role_designer}
            className="h-[118px]"
          />
          <RoleCard
            role="role_trader"
            iconSrc="/icons/roles/trader.svg"
            coloredSrc="/icons/roles/colored/trader.svg"
            onClick={() => handleRoleClick('role_trader')}
            selected={formData.role_trader}
            className="h-[118px]"
          />
          <RoleCard
            role="role_creator"
            iconSrc="/icons/roles/creator.svg"
            coloredSrc="/icons/roles/colored/creator.svg"
            onClick={() => handleRoleClick('role_creator')}
            selected={formData.role_creator}
            className="h-[118px]"
          />
          <RoleCard
            role="role_researcher"
            iconSrc="/icons/roles/researcher.svg"
            coloredSrc="/icons/roles/colored/researcher.svg"
            onClick={() => handleRoleClick('role_researcher')}
            selected={formData.role_researcher}
            className="h-[118px]"
          />
          <RoleCard
            role="role_investor"
            iconSrc="/icons/roles/investor.svg"
            coloredSrc="/icons/roles/colored/investor.svg"
            onClick={() => handleRoleClick('role_investor')}
            selected={formData.role_investor}
            className="h-[118px]"
          />
          <RoleCard
            role="role_community_manager"
            iconSrc="/icons/roles/community.svg"
            coloredSrc="/icons/roles/colored/community.svg"
            onClick={() => handleRoleClick('role_community_manager')}
            selected={formData.role_community_manager}
          />
        </div>

        <span className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
          New projects
        </span>
        <Checkbox
          checked={formData.open_to_opportunities as boolean}
          setChecked={(v) => handleCheckClick(v)}
          label="I'm open to contribute to new projects"
          id="open-to-new-checkbox"
          outerClassName="mt-3"
        />
      </div>
    </OnboardingLayout>
  );
};
