import * as React from 'react';
import SVG from 'react-inlinesvg';

export const LinkIcon = ({ url, icon }: { url: string; icon: string }) => {
  return (
    <a target="_blank" rel="noreferrer" href={url}>
      <SVG src={icon} className="text-indigoGray-90" height={16} width={16} />
    </a>
  );
};
