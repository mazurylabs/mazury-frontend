import { FC, ReactNode } from 'react';

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  backgroundColor: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const SocialButton: FC<SocialButtonProps> = ({
  icon,
  label,
  backgroundColor,
  className,
  disabled,
  onClick,
  variant = 'primary',
}) => {
  return (
    <button
      style={{
        backgroundColor: variant === 'primary' ? backgroundColor : '#fff',
        color: variant === 'primary' ? '#fff' : backgroundColor,
        borderWidth: variant === 'primary' ? '0px' : '2px',
        borderColor: variant === 'primary' ? '#fff' : backgroundColor,
        borderStyle: 'solid',
      }}
      className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold uppercase text-indigoGray-5 shadow-base disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};
