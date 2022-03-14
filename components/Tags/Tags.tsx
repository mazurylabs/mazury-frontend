import Image from 'next/image';
import { FC, KeyboardEvent, useState } from 'react';
import { TagItem } from '.';
import { TagItemProps } from './TagItem';

export interface ITagItem extends Omit<TagItemProps, 'className' & 'onRemove'> {
  value: string;
}

interface TagsProps {
  tags: ITagItem[];
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
  onAdd,
}) => {
  const [newTag, setNewTag] = useState('');

  return (
    <div
      role="tags"
      className={`flex flex-wrap items-center gap-1 ${className}`}
    >
      {tags.map((tag) => {
        return (
          <TagItem
            key={tag.value}
            onRemove={onRemove}
            value={tag.value}
            color={tag.color}
            label={tag.label}
            showRemove={tag.showRemove}
          />
        );
      })}
      {/* TODO: allow input */}
      {allowInput && (
        <div
          role="button"
          className="flex w-fit items-center rounded-[4px] border border-indigoGray-20 py-1 px-2 hover:cursor-pointer hover:bg-indigoGray-5"
          onKeyUp={(e) => {
            if (!onAdd) {
              return console.error('Please pass in onAdd prop');
            }
            if (e.key === 'Enter') {
              if (!newTag) {
                return alert('Please enter something');
              }
              onAdd(newTag);
              setNewTag('');
            }
          }}
        >
          <Image
            role="button"
            src="/icons/plus.svg"
            height="12px"
            width="12px"
            alt="Plus icon"
            onClick={() => {
              if (!newTag) {
                return alert('Please enter something');
              }
              if (!onAdd) {
                return console.error('Please pass in onAdd prop');
              }
              onAdd(newTag);
              setNewTag('');
            }}
          />
          <input
            role="input"
            type="text"
            placeholder="Add your tag"
            className="ml-1 w-20 bg-transparent text-xs font-bold text-indigoGray-90 outline-none placeholder:text-indigoGray-90 focus:font-medium"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
