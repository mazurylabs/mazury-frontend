import * as React from 'react';
import SVG from 'react-inlinesvg';

interface EmptyStateProps {
  onReset?: () => void;
  emptyMessage?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onReset,
  emptyMessage,
}) => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center space-y-[20px]">
      <div>
        <SVG
          src="/icons/empty-credentials-listing.svg"
          width={225}
          height={91}
        />
        <p className="text-center font-sans text-sm text-indigoGray-90">
          {emptyMessage || 'No credentials to show'}
        </p>
      </div>

      {onReset && (
        <button
          type="button"
          className="font-sans text-xs font-semibold text-indigo-600"
          onClick={onReset}
        >
          Reset filter
        </button>
      )}
    </div>
  );
};
