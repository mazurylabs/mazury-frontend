import React, { useEffect } from 'react';

export const useClickOutside = (
  ref: React.MutableRefObject<HTMLElement>,
  handler: <T>(event: T) => void
) => {
  useEffect(() => {
    const listener = <T extends { target: any }>(event: T) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
