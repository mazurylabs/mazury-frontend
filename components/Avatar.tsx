import React from 'react';

interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  borderRadius?: number | string;
  className?: string;
}

export const Avatar: React.FC<Props> = ({
  src,
  width = '100px',
  height = '100px',
  alt = 'Avatar',
  borderRadius = '100%',
  className,
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ borderRadius, width, height }}
      className={className}
    />
  );
};
