import Image from 'next/image';
import { FC } from 'react';

interface SpinnerProps {
  size?: number | string;
  className?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size, className }) => {
  const sizeValue = size || '64px';

  return (
    <Image
      src="/icons/loader.svg"
      width={sizeValue}
      height={sizeValue}
      alt="Loading indicator"
      className={`mx-auto animate-spin ${className}`}
    />
  );
};
