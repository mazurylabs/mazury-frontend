import { FCWithClassName } from 'types';
import { colors } from 'utils';

interface SkeletonProps {
  backgroundColor?: string;
  variant?: 'rect' | 'circle';
  heightClassName?: string;
  widthClassName?: string;
  innerClassName?: string;
}

export const Skeleton: FCWithClassName<SkeletonProps> = ({
  className,
  backgroundColor = colors.indigoGray[20],
  variant = 'rect',
  heightClassName = 'h-5',
  widthClassName = 'w-5',
  innerClassName = '',
}) => {
  if (variant === 'rect') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div
          className={`${heightClassName} ${innerClassName} w-full rounded`}
          style={{ backgroundColor }}
        />
      </div>
    );
  }

  if (variant === 'circle') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div
          className={`rounded-full ${heightClassName} ${widthClassName} ${innerClassName}`}
          style={{ backgroundColor }}
        />
      </div>
    );
  }

  return null;
};
