import * as React from 'react';
import { useRouter } from 'next/router';

import { Button } from '@/components';
import storage from '@/utils/storage';
import { ROUTE_PATH } from '@/config';

export const AllSet = () => {
  const router = useRouter();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const pathToRoute = storage.getToken(ROUTE_PATH);
    router.replace(pathToRoute || '/');
  };

  return (
    <>
      <div className="mb-[90px] space-y-8 sm:mb-[128px]">
        <div className="space-y-3">
          <h2 className="font-demi text-4xl text-indigoGray-90">
            You’re all set
          </h2>
          <p className="font-sans text-sm font-medium text-indigoGray-60">
            You now have a complete profile on Mazury. Go and discover some new
            people.
          </p>
        </div>
      </div>

      <Button size="large" onClick={handleSubmit} className="mt-auto w-full">
        Go to app
      </Button>
    </>
  );
};
