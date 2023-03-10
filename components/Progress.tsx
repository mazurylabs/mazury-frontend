import * as React from 'react';

interface ProgressType {
  total: number;
  current: number;
  label: string;
  size: 'small' | 'large';
  variant: 'light' | 'dark';
}

const Sizes: Record<ProgressType['size'], string> = {
  small: 'w-[100px]',
  large: 'w-[200px]',
};

const Variants: Record<ProgressType['variant'], string> = {
  light: '',
  dark: '',
};

export const Progress: React.FC<ProgressType> = ({
  total,
  current,
  label,
  size = 'small',
  variant = 'dark',
}) => {
  return (
    <div className="flex h-3 items-center space-x-4">
      <div
        className={`${Sizes[size]} h-full rounded-lg  ${
          variant === 'dark' ? 'bg-indigoGray-60' : 'bg-indigoGray-30'
        }`}
      >
        <div
          style={{ width: `${(current / total) * 100}%` }}
          className={`h-full rounded-lg ${
            variant === 'dark' ? 'bg-white' : 'bg-indigoGray-90'
          }`}
        />
      </div>

      <div>
        <p
          className={`font-sans ${size === 'small' ? 'text-xs' : 'text-sm'} ${
            variant === 'dark' ? 'text-indigo-100' : 'indigoGray-90'
          }`}
        >
          {current}/{total} {label}
        </p>
      </div>
    </div>
  );
};
