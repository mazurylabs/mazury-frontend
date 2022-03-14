import Image from 'next/image';
import { FC } from 'react';

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const InfoBox: FC<InfoBoxProps> = ({ children, className }) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-md bg-indigoGray-10 p-3 ${className}`}
    >
      <div className="w-1/12">
        <Image
          src="/icons/info.svg"
          width="20px"
          height="20px"
          alt="Info icon"
        />
      </div>

      <p className="text-sm font-medium text-indigoGray-90">{children}</p>
    </div>
  );
};
