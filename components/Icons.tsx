import { FC } from 'react';

interface XIconProps {
  width?: string;
  height?: string;
  color?: string;
  label?: string;
}

export const XIcon: FC<XIconProps> = ({
  width,
  height,
  color,
  label = 'Remove button',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      <path
        d="M12 4L4 12"
        stroke={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L12 12"
        stroke={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
