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
      className={`flex bg-indigoGray-20 ${
        expanded ? 'p-[12px]' : 'p-2 hover:cursor-pointer'
      } items-center justify-center gap-2 rounded-xl text-[14px] font-normal`}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt={iconAlt}
        className={`h-[16px] w-[16px] ${!expanded && 'hover:cursor-pointer'}`}
      />
      {expanded && (
        <input
          className="w-3/4 bg-indigoGray-20 outline-none"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
