import { Spinner } from '@/components';
import clsx from 'clsx';
import * as React from 'react';
import SVG from 'react-inlinesvg';

interface ActionButtonProps {
  icon: string;
  label?: string;
  className?: string;
  onClick: () => void;
  loading?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  className,
  onClick,
  loading,
}) => {
  return (
    <button
      type="button"
      className={`flex h-[45px] w-full shrink-0 items-center rounded-lg border border-[1.5px] border-indigoGray-20 px-6 py-2 font-sansSemi text-sm font-semibold text-indigoGray-90 lg:h-fit lg:w-fit ${className}`}
      onClick={onClick}
    >
      <SVG
        src={icon}
        height={16}
        width={16}
        className={clsx(label && 'mr-2')}
      />
      {label}
      {loading && <Spinner size={16} className="ml-2" variant="dark" />}
    </button>
  );
};
