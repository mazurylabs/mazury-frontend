import { Role } from 'types';

export interface RoleCardProps {
  role: Role;
  iconSrc: string;
  coloredSrc: string;
  selected?: boolean;
  onClick?: () => void;
}
