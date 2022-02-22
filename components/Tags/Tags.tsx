import { FC, useState } from 'react';
import { TagItem } from '.';
import { TagItemProps } from './TagItem';

interface TagItem extends Omit<TagItemProps, 'className' & 'onRemove'> {
  value: string;
}

interface TagsProps {
  tags: TagItem[];
  className?: string;
  onRemove?: (value: string) => void;
  allowInput?: boolean;
  onAdd?: (value: string) => void;
}

export const Tags: FC<TagsProps> = ({
  tags,
  className,
  onRemove,
  allowInput = false,
}) => {
  return (
    <div role="tags" className="flex flex-wrap gap-1">
      {tags.map((tag) => {
        return (
          <TagItem
            key={tag.value}
            onRemove={onRemove}
            className={className}
            value={tag.value}
            color={tag.color}
            label={tag.label}
            showRemove={tag.showRemove}
          />
        );
      })}
      {/* TODO: allow input */}
    </div>
  );
};
