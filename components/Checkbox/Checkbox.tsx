import SVG from 'react-inlinesvg';
import { FC, useRef } from 'react';
import { CheckboxProps } from './Checkbox.types';

export const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  setChecked,
  id,
  outerClassName,
}) => {
  const hiddenCheckboxRef = useRef<HTMLInputElement>(null);

  const onVisibleCheckboxClick = () => {
    hiddenCheckboxRef?.current?.click();
  };

  return (
    <div
      className={`flex items-center space-x-[11px] ${outerClassName}`}
      data-testid="checkbox-outer-container"
    >
      <button
        role="checkbox"
        onClick={onVisibleCheckboxClick}
        className="h-6 h-4 hover:cursor-pointer"
      >
        <SVG
          role="checkbox"
          src={`/icons/checkbox-${checked ? 'checked' : 'unchecked'}.svg`}
          width="24px"
          height="24px"
        />
      </button>

      <label htmlFor={id} className="text-base font-medium text-indigoGray-70">
        {label}
      </label>
      <input
        data-testid="Hidden Checkbox"
        ref={hiddenCheckboxRef}
        type="checkbox"
        hidden
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        id={id}
      />
    </div>
  );
};
