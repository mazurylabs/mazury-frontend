import * as React from 'react';

import { Button } from '../Button';

interface DisconnectStepProps {
  handleCancel: () => void;
  handleDisconnect: () => void;
}

export const DisconnectStep: React.FC<DisconnectStepProps> = ({
  handleDisconnect,
  handleCancel,
}) => {
  return (
    <div className="w-fit max-w-[300px]">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Disconnect Twitter
      </h3>
      <p className="mt-2 font-sans text-sm font-medium text-indigoGray-60">
        Are you sure you want to disconnect Twitter from your Mazury profile?
      </p>

      <div className="mt-4 flex w-fit justify-around space-x-4">
        <Button
          className="w-[140px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90 !shadow-base"
          variant="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="w-[140px] shrink-0"
          variant="primary"
          onClick={() => {
            handleDisconnect();
            handleCancel();
          }}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};
