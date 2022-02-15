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
      className={`rounded bg-slate-200 px-4 py-1 ${className} disabled:opacity-50`}
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
      className={`flex items-center gap-2 rounded-xl border-2 border-blue-800 bg-white px-8 text-blue-800 shadow ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};
