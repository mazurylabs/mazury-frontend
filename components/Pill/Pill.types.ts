import { ColorName, ProfileSection as Labels } from 'types';
import * as React from 'react';

export interface PillProps {
  label: Labels | string | React.ReactNode;
  color?: ColorName;
  onClick?: () => void;
  active?: boolean;
  isNav?: boolean;
  className?: string;
}
