import * as React from 'react';

import { Profile } from 'types';

import { Navbar } from './Navbar';
import { NavItem } from './type';
import clsx from 'clsx';

interface Props {
  isVisible: boolean;
  profile?: Profile;
  navItems: NavItem[];
}

export const ProfileSummaryMobile: React.FC<Props> = ({
  isVisible,
  profile,
  navItems,
}) => {
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-30 h-fit w-screen -translate-y-full bg-white transition-all duration-300 lg:hidden',
        isVisible && 'translate-y-0'
      )}
    >
      <div className="relative flex items-center space-x-2 bg-indigoGray-10 px-4 py-2">
        <div>
          <img
            src={profile?.avatar || '/icons/no-avatar.svg'}
            alt="Profile"
            className="h-[40px] w-[40px] rounded-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-demi text-lg !font-bold text-indigoGray-90">
            {profile?.full_name}
          </h1>
          {profile?.username && (
            <p className="font-sans text-xs text-indigoGray-50">
              @{profile.username}
            </p>
          )}
        </div>
      </div>

      <div className="my-2 bg-white">
        <Navbar links={navItems || []} />
      </div>
    </div>
  );
};
