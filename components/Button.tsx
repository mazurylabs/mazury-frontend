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
      className={`bg-slate-200 px-4 py-1 rounded ${className} disabled:opacity-50`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const OutlineButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={`border-2 border-blue-800 text-blue-800 shadow rounded-lg bg-white px-8 flex gap-2 items-center ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};
