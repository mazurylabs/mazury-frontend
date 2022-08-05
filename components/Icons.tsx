import { FC } from 'react';

interface IconProps {
  width?: string;
  height?: string;
  color?: string;
  label?: string;
  className?: string;
}

interface Icon extends FC<IconProps> {}

export const XIcon: Icon = ({
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

export const HomeIcon: FC<IconProps> = ({
  width = '16px',
  height = '16px',
  color,
  label = 'Home icon',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5494 1.19273C12.1914 0.91997 11.6953 0.91997 11.3373 1.19273L2.57694 7.86732C2.32869 8.05646 2.18298 8.35066 2.18298 8.66275V20.1049C2.18298 20.8826 2.49856 21.6242 3.0534 22.1677C3.60753 22.7106 4.35479 23.0119 5.12974 23.0119H18.757C19.532 23.0119 20.2792 22.7106 20.8334 22.1677C21.3882 21.6242 21.7038 20.8826 21.7038 20.1049V8.66275C21.7038 8.35066 21.5581 8.05646 21.3098 7.86732L12.5494 1.19273ZM4.18298 20.1049V9.15803L11.9434 3.24534L19.7038 9.15803V9.18431C17.8621 15.1569 14.48 19.0524 8.2165 21.0119H5.12974C4.87207 21.0119 4.629 20.9115 4.45295 20.739C4.27761 20.5673 4.18298 20.3387 4.18298 20.1049Z"
        fill={color}
      />
    </svg>
  );
};

export const SearchIcon: FC<IconProps> = ({
  width = '16px',
  height = '16px',
  color,
  label = 'Search icon',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.75 1C5.36522 1 1 5.36522 1 10.75C1 16.1348 5.36522 20.5 10.75 20.5C13.0822 20.5 15.2232 19.6811 16.901 18.3153L21.2928 22.707C21.6833 23.0975 22.3165 23.0975 22.707 22.707C23.0975 22.3164 23.0975 21.6833 22.707 21.2928L18.3153 16.901C19.6811 15.2232 20.5 13.0822 20.5 10.75C20.5 5.36522 16.1348 1 10.75 1ZM3 10.75C3 6.46979 6.46979 3 10.75 3C15.0302 3 18.5 6.46979 18.5 10.75C18.5 13.9855 16.5173 16.7579 13.7006 17.9185C13.8534 17.3765 13.9352 16.8046 13.9352 16.2137C13.9352 12.7506 11.1277 9.94312 7.66459 9.94312C5.85963 9.94312 4.23279 10.7057 3.0887 11.9263C3.03029 11.5427 3 11.1499 3 10.75Z"
        fill={color}
      />
    </svg>
  );
};

export const SlidersIcon: FC<IconProps> = ({
  width = '16px',
  height = '16px',
  color,
  label = 'Settings icon',
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
        d="M2.66667 14V9.33334"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66667 6.66667V2"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14V8"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.33333V2"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 14V10.6667"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 8V2"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666668 9.33334H4.66667"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5.33334H10"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 10.6667H15.3333"
        stroke={color}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PenIcon: FC<IconProps> = ({
  width = '16px',
  height = '16px',
  color,
  label = 'Pen icon',
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
        d="M14 1.3335C4 1.3335 2.66667 10.6668 2 14.6668H3.332C3.776 12.4448 4.88733 11.2228 6.66667 11.0002C9.33333 10.6668 11.3333 8.3335 12 6.3335L11 5.66683L11.6667 5.00016C12.3333 4.3335 13.0027 3.3335 14 1.3335Z"
        fill={color}
      />
    </svg>
  );
};
