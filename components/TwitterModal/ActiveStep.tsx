import * as React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

interface ActiveStepProps {
  url: string;
  handleConnect: () => void;
  handleSkip: () => void;
  handleChange: (value: string) => void;
  loading: boolean;
}

export const ActiveStep: React.FC<ActiveStepProps> = ({
  url,
  handleConnect,
  handleSkip,
  handleChange,
  loading,
}) => {
  return (
    <div className="w-fit max-w-[300px]">
      <h3 className="font-demi text-3xl text-indigoGray-90">
        Verify Twitter link
      </h3>
      <p className="mt-2 font-sans text-sm font-medium text-indigoGray-60">
        Paste your tweet&apos;s link here to verify
      </p>

      <Input
        label="Twitter link"
        outerClassName="mt-4"
        placeholder="e.g. https://twitter.com/mazuryxyz/status/1565365440557236224"
        value={url}
        onChange={handleChange}
      />

      <div className="mt-4 flex w-full justify-around space-x-4">
        <Button
          className="w-[140px] shrink-0 !border !border-indigoGray-20 !bg-indigoGray-10 !text-indigoGray-90 !shadow-base"
          variant="secondary"
          onClick={handleSkip}
        >
          Skip
        </Button>
        <Button
          className="w-[140px] shrink-0"
          variant="primary"
          onClick={handleConnect}
          disabled={!url}
          loading={loading}
        >
          Connect
        </Button>
      </div>
    </div>
  );
};
