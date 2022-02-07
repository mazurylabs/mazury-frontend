import React from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState<number>();

  React.useEffect(() => {
    window?.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    });
  }, []);

  return scrollPosition;
};
