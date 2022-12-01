import { ReactNode } from 'react';

export interface CheckboxProps {
  label: string | ReactNode;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  id: string;
  outerClassName?: string;
  innerClassName?: string;
}
