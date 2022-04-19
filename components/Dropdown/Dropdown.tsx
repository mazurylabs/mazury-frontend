import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FCWithClassName } from 'types';

interface DropdownProps {
  label: string;
  optionsContainerClassName?: string;
}

export const Dropdown: FCWithClassName<DropdownProps> = ({
  className,
  children,
  label,
  optionsContainerClassName,
}) => {
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = () => {
    setShowOptions((v) => !v);
  };

  // TODO: handle click outside of options container
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (
  //       optionsContainerRef.current &&
  //       !optionsContainerRef.current.contains(event.target)
  //     ) {
  //       setShowOptions(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true);
  //   };
  // }, []);

  return (
    <div className="relative">
      <div
        onClick={toggleShowOptions}
        className={`flex w-fit hover:cursor-pointer ${className}`}
        role="dropdown"
      >
        <label
          htmlFor={label}
          className="mr-2 text-sm font-bold text-indigoGray-90"
        >
          {label}
        </label>
        <Image
          src="/icons/angle-down.svg"
          width="16px"
          height="16px"
          alt="Dropdown icon"
        />
      </div>

      {/* Content / options */}
      {showOptions && (
        <div
          ref={optionsContainerRef}
          className={`top-o absolute left-0 rounded-3xl border border-indigoGray-20 bg-white p-6 shadow-xl ${optionsContainerClassName}`}
          data-testid="dropdown-options"
        >
          {children}
        </div>
      )}
    </div>
  );
};
