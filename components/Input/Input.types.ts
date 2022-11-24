import { HTMLInputTypeAttribute, ReactNode } from 'react';

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
>;
export interface InputProps extends NativeInputProps {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  outerClassName?: string;
  disabled?: boolean;
  error?: boolean;
}
