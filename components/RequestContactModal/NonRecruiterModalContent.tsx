import Link from 'next/link';
import { useState } from 'react';

export const NonRecruiterModalContent = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  return (
    <div className="mt-6 h-[210px] lg:h-[250px]">
      <div>
        <h3 className="mt-6 mb-2 font-serif text-3xl font-semibold text-indigoGray-90">
          Beta feature
        </h3>
        <p className="font-sans text-sm font-normal text-indigoGray-90">
          This feature is in testing. If you wish to join the beta group,
          message us at
          <a
            href="mailto:wojtek@mazury.com"
            className="ml-1 font-semibold text-indigo-600"
          >
            wojtek@mazury.com
          </a>
        </p>
      </div>
    </div>
  );
};
