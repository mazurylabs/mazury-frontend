import Image from 'next/image';
import { FC, useRef } from 'react';

interface ToggleProps {
  isToggled: boolean;
  onToggle: (active: boolean) => void;
  className?: string;
}

export const Toggle: FC<ToggleProps> = ({ isToggled, onToggle, className }) => {
  const hiddenCheckboxRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    hiddenCheckboxRef?.current?.click();
  };

  return (
    <div className={`${className}`} data-testid="toggle-outer-container">
      <Image
        role="button"
        src={`/icons/toggle-${isToggled ? 'on' : 'off'}.svg`}
        alt="Toggle"
        width="40px"
        height="24px"
        onClick={onClick}
        className="hover:cursor-pointer"
      />
      <input
        data-testid="Hidden Checkbox"
        ref={hiddenCheckboxRef}
        type="checkbox"
        hidden
        checked={isToggled}
        onChange={(e) => onToggle(e.target.checked)}
      />
    </div>
  );
};
