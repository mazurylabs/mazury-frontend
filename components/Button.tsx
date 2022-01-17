import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-slate-200 px-4 py-2 rounded-lg ${className} disabled:opacity-50`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
