import React from 'react';

interface Props {
  className?: string;
}

export const HR: React.FC<Props> = ({ className }) => {
  return <hr className={`my-12 border-indigoGray-20 ${className}`} />;
};
