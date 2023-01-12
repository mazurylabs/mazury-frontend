import * as React from 'react';
import SVG from 'react-inlinesvg';

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  className,
  label,
}) => {
  const [toggleDropdown, setToggleDropdown] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string>();

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <button
      type="button"
      className={`relative flex h-12 items-center justify-between rounded-lg  bg-indigoGray-5 px-4 ${className}`}
      //   onClick={() => setToggleDropdown(!toggleDropdown)}
    >
      <p className="font-sansMid text-sm font-medium text-indigoGray-50">
        {selectedOption || `All ${label.toLowerCase()}`}
      </p>
      <SVG src="/icons/chevron-down.svg" height={24} width={24} />

      {toggleDropdown && (
        <div className="absolute top-0 left-0 z-10 h-[400px] w-full bg-red-200"></div>
      )}
    </button>
  );
};
