import Image from 'next/image';
import React from 'react';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className='container py-20 text-center'>
      <Image
        src='/waves.png'
        alt='Mazury logo'
        height='50'
        width='50'
        className='rounded-full'
      />
      {children}
    </div>
  );
};
