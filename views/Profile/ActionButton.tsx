import * as React from 'react';
import SVG from 'react-inlinesvg';

export const ActionButton = ({
  icon,
  label,
  className,
}: {
  icon: string;
  label: string;
  className?: string;
}) => {
  return (
    <button
      type="button"
      className={`flex shrink-0 items-center rounded-lg border border-[1.5px] border-indigoGray-20 px-6 py-2 font-sansSemi text-sm font-semibold text-indigoGray-90 ${className}`}
    >
      <SVG src={icon} height={16} width={16} className="mr-2" />
      {label}
    </button>
  );
};
