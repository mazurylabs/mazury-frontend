import React from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import clsx from 'clsx';

const variants = {
  xs: 'h-5 w-5',
  sm: 'h-6 w-6',
  md: 'h-10 w-10',
  lg: 'h-[100px] w-[100px]',
  xl: 'h-[150px] w-[150px]',
};

interface Props {
  src: string;
  alt: string;
  variant?: keyof typeof variants;
  className?: string;
}

export const Avatar: React.FC<Props> = ({
  src,
  alt,
  variant = 'md',
  className,
}) => {
  return (
    <div className={variants[variant]}>
      <RadixAvatar.Root className={clsx(variants[variant], 'rounded-full')}>
        <RadixAvatar.Image
          className={clsx('object-cover h-full w-full rounded-full', className)}
          src={src}
          alt={alt}
        />
        <RadixAvatar.Fallback className="h-full w-full" delayMs={600}>
          <div className="bg-indigoGray-30 animate-pulse h-full w-full rounded-full" />
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    </div>
  );
};
