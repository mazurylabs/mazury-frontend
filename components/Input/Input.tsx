import { FC } from 'react';
import { InputProps } from './Input.types';

export const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  id,
  type = 'text',
  className,
  /*
  The className that will be applied to the outer div containing the label and the input
  */
  outerClassName,
  disabled = false,
  error = false,
  ...rest
}) => {
  return (
    <div className={`flex flex-col ${outerClassName}`}>
      {label && (
        <label
          className="font-sans text-sm font-normal text-indigoGray-40"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        className={`block rounded-lg border border-indigoGray-20 px-4 py-3 font-sans text-sm font-normal text-indigoGray-90 outline-none placeholder:text-indigoGray-50 hover:border-indigoGray-30 focus:border-indigo-600 ${
          disabled && 'cursor-not-allowed border-indigoGray-40 bg-indigoGray-10'
        } ${error && 'border-red-500 text-red-500'} ${className}`}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};
