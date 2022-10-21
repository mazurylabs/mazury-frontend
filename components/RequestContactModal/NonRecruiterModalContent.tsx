import Link from 'next/link';
import { useState } from 'react';

export const NonRecruiterModalContent = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  return (
    <div className="mt-6 h-[210px] lg:h-[250px]">
      <div>
        <h3 className="mt-6 mb-2 font-serif text-3xl font-semibold text-indigoGray-90">
          Connect with any eth address
        </h3>
        <p className="font-sans text-sm font-normal text-indigoGray-90">
          We are currently running this feature in a shielded mode.
          <br></br>
          <br></br>If you&apos;re interesting in connecting with talent on
          Mazury, please reach out to us at
          <a
            href="mailto:recruiting@mazury.xyz"
            className="ml-1 font-semibold text-indigo-600"
          >
            recruiting@mazury.xyz
          </a>
        </p>
      </div>
    </div>
  );
};
