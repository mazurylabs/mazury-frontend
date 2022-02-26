import { ColorName, ProfileSection as Labels } from 'types';

export interface PillProps {
  label: Labels | string;
  color?: ColorName;
  onClick?: () => void;
  active?: boolean;
  isNav?: boolean;
  className?: string;
}
