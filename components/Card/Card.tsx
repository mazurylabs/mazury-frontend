import { FC } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  clickable = true,
  onClick,
}) => {
  return (
    <div
      className={`rounded-2xl border border-indigoGray-20 p-6 transition-all duration-300 ${className} ${
        clickable
          ? 'cursor-pointer bg-white shadow-base hover:shadow-lg active:bg-indigoGray-5 active:shadow-none'
          : 'border-indigoGray-20 bg-transparent'
      }`}
      onClick={() => {
        if (!clickable) {
          return console.error(
            'Clickable prop is false, but onClick was called'
          );
        }
        onClick?.();
      }}
    >
      {children}
    </div>
  );
};
