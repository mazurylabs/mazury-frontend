import React from 'react';

interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
  borderRadius?: number | string;
}

export const Avatar: React.FC<Props> = ({
  src,
  width = '150px',
  height = '150px',
  alt = 'Avatar',
  borderRadius = '100%',
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ borderRadius }}
    />
  );
};
