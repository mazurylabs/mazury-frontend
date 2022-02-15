import React from 'react';

interface Props {
  iconSrc: string;
  iconAlt: string;
  placeholder?: string;
  expanded?: boolean;
}

export const InputWithIcon: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ iconSrc, iconAlt, placeholder, expanded = true, ...props }) => {
  const { onClick } = props;

  return (
    <div
      className={`bg-indigoGray-20 flex ${
        expanded ? 'p-[12px]' : 'p-2 hover:cursor-pointer'
      } rounded-xl items-center justify-center gap-2 font-normal text-[14px]`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt={iconAlt}
        className={`w-[16px] h-[16px] ${!expanded && 'hover:cursor-pointer'}`}
      />
      {expanded && (
        <input
          className="bg-indigoGray-20 w-3/4 outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
