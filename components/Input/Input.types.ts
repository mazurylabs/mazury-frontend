import { HTMLInputTypeAttribute, ReactNode } from 'react';

export interface InputProps {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  marginTop?: number;
  outerClassName?: string;
}
