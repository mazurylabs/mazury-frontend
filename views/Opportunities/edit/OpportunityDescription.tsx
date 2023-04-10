import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Button } from 'components';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export const OpportunityDescription: React.FC<Props> = ({
  onSubmit,
  onBack,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-1">
        <p className="font-sans text-sm text-indigoGray-40">Description</p>
        <textarea
          placeholder="Write a description…"
          className="w-full h-[377px] lg:h-[477px] border rounded-lg border-indigoGray-20 grow resize-none bg-transparent px-4 py-3 font-sans text-sm text-indigoGray-90"
        />
      </div>

      <div className="flex w-full justify-between">
        <Button variant="tertiary" size="large" onClick={onBack}>
          <SVG src="/icons/chevron-left.svg" className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Button variant="primary" size="large" type="submit">
          Publish{' '}
          <SVG src="/icons/chevron-right.svg" className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
