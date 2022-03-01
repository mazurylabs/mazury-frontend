export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'large';
}

export interface BaseButtonProps extends Omit<ButtonProps, 'variant'> {}
