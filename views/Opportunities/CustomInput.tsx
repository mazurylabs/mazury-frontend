import * as React from 'react';
import SVG from 'react-inlinesvg';

import { Input } from 'components';

export const CustomInput: React.FC<
  React.ComponentProps<typeof Input> & {
    info?: string;
  }
> = ({ error, label, info, required = true, onChange, ...props }) => {
  return (
    <div className="space-y-1">
      <Input
        label={
          <div className="font-sans text-indigoGray-40 text-sm">
            {label}{' '}
            {required && (
              <span className="font-sans font-normal text-indigoGray-30">
                (Required)
              </span>
            )}
          </div>
        }
        {...props}
        onChange={onChange}
      />

      {(error || info) && (
        <div className="flex items-center space-x-1 pl-2">
          <SVG
            src={`/icons/error${!error ? '-warning-line' : ''}.svg`}
            height={12}
            width={12}
          />
          <p
            className={`font-sans text-xs text-${
              error ? 'red-500' : 'indigoGray-40'
            }`}
          >
            {info || `${label} is required`}
          </p>
        </div>
      )}
    </div>
  );
};
