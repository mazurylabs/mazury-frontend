import { FC } from 'react';
import { BaseButtonProps, ButtonProps } from './Button.types';

const BaseButton: FC<BaseButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={`flex items-center gap-2 rounded-[8px] py-3 px-6 font-sans text-xs font-bold shadow-base disabled:cursor-not-allowed disabled:shadow-none ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className,
}) => {
  if (variant === 'primary') {
    return (
      <BaseButton
        onClick={onClick}
        disabled={disabled}
        className={`bg-indigoGray-90  text-indigoGray-5 hover:bg-indigoGray-70 active:text-indigoGray-30  disabled:bg-indigoGray-30 ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === 'secondary') {
    return (
      <BaseButton
        onClick={onClick}
        disabled={disabled}
        className={`border-[1.5px] border-indigoGray-90 bg-white text-indigoGray-90 hover:border-indigoGray-70 hover:text-indigoGray-70 active:border-indigoGray-80 active:text-indigoGray-80 disabled:border-indigoGray-30 disabled:text-indigoGray-30 ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === 'tertiary') {
    return (
      <BaseButton
        onClick={onClick}
        disabled={disabled}
        className={`bg-none text-indigoGray-90 shadow-none hover:text-indigoGray-70 active:text-indigoGray-60 disabled:text-indigoGray-30 ${className}`}
      >
        {children}
      </BaseButton>
    );
  }

  return (
    <BaseButton onClick={onClick} disabled={disabled} className={className}>
      {children}
    </BaseButton>
  );
};

export const BlueSocialButton: FC<ButtonProps> = ({
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
