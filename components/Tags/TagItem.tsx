import { XIcon } from 'components';
import Image from 'next/image';
import { FC, useState } from 'react';
import { ThemeColor } from 'types';

export interface TagItemProps {
  color: ThemeColor;
  label: string;
  onRemove?: (value: string) => void;
  showRemove?: boolean;
  className?: string;
  value?: string;
}

export const TagItem: FC<TagItemProps> = ({
  color,
  label,
  onRemove,
  className,
  showRemove = true,
  value,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      style={{
        backgroundColor: hovered ? color[100] : color[50],
        color: color[900],
      }}
      className={`flex w-fit items-center gap-1 rounded px-2 py-1 text-xs font-bold ${className}`}
      role="tag"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="cursor-default">{label}</span>
      {showRemove && (
        <button
          onClick={() => {
            if (!onRemove) {
              throw new Error(
                'onRemove is required if you want to show the remove button'
              );
            }
            if (!value) {
              throw new Error(
                'value is required if you want to show the remove button'
              );
            }
            onRemove(value);
          }}
          className="flex items-center hover:cursor-pointer"
        >
          <XIcon
            width="16px"
            height="16px"
            color={color[900]}
            label={`Remove ${label}`}
          />
        </button>
      )}
    </div>
  );
};
