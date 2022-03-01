export interface CheckboxProps {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  id: string;
  outerClassName?: string;
}
