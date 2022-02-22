import { TrimmedRole } from 'types';

export interface RoleCardProps {
  role: TrimmedRole;
  iconSrc: string;
  coloredSrc: string;
  selected?: boolean;
  onClick?: () => void;
}
