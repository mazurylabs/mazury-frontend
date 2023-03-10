import * as React from 'react';
import SVG from 'react-inlinesvg';

interface Props {
  title: string;
  icon: string;
  className: string;
}

export const ProfileTag: React.FC<Props> = ({ title, icon, className }) => {
  return (
    <div
      className={`flex w-fit items-center space-x-2 rounded-md px-2 py-[2px] ${className}`}
    >
      <SVG height={16} width={16} src={icon} />
      <p className="font-sansMid text-xs font-medium text-emerald-50">
        {title}
      </p>
    </div>
  );
};
