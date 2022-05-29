import { FC, useRef } from 'react';
import SVG from 'react-inlinesvg';

interface ToggleProps {
  isToggled: boolean;
  onToggle: (active: boolean) => void;
  className?: string;
  id?: string;
}

export const Toggle: FC<ToggleProps> = ({
  isToggled,
  onToggle,
  className,
  id,
}) => {
  const hiddenCheckboxRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    hiddenCheckboxRef?.current?.click();
  };

  return (
    <div className={`${className}`} data-testid="toggle-outer-container">
      <button type="button" onClick={onClick} className="hover:cursor-pointer">
        <SVG
          src={`/icons/toggle-${isToggled ? 'on' : 'off'}.svg`}
          width="40px"
          height="24px"
        />
      </button>
      <input
        data-testid="Hidden Checkbox"
        ref={hiddenCheckboxRef}
        type="checkbox"
        hidden
        checked={isToggled}
        onChange={(e) => onToggle(e.target.checked)}
        id={id}
      />
    </div>
  );
};
