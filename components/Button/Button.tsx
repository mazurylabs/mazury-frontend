import * as React from 'react';
import { Spinner } from '../Spinner';
import { ButtonProps } from './Button.types';

const variants = {
  primary:
    'bg-indigoGray-90  text-indigoGray-5 hover:bg-indigoGray-70 active:text-indigoGray-30  disabled:bg-indigoGray-30',
  secondary:
    'border-[1.5px] border-indigoGray-90 bg-white text-indigoGray-90 hover:border-indigoGray-70 hover:text-indigoGray-70 active:border-indigoGray-80 active:text-indigoGray-80 disabled:border-indigoGray-30 disabled:text-indigoGray-30',
  tertiary:
    'bg-none text-indigoGray-90 shadow-none hover:text-indigoGray-70 active:text-indigoGray-60 disabled:text-indigoGray-30',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  size = 'small',
  loading,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-[8px] ${
        size === 'small' ? 'py-2' : 'py-3'
      } px-6 font-sans text-sm font-bold shadow-base disabled:cursor-not-allowed disabled:shadow-none ${
        variants[variant]
      } ${className}`}
      {...rest}
    >
      <>{children}</>
      {loading && (
        <Spinner
          size={16}
          className="ml-2"
          variant={variant === 'primary' ? 'light' : 'primary'}
        />
      )}
    </button>
  );
};

export const BlueSocialButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border-2 border-blue-800 py-1 px-4 text-blue-800 shadow-base disabled:cursor-not-allowed disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
};
