import { useMemo } from 'react';
import { useScreenWidth } from './useScreenWidth';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const calculateBreakpoint: (screenWidth: number) => Breakpoint = (
  screenWidth
) => {
  if (screenWidth < 640) {
    return 'xs';
  } else if (screenWidth < 768) {
    return 'sm';
  } else if (screenWidth < 1024) {
    return 'md';
  } else if (screenWidth < 1280) {
    return 'lg';
  } else if (screenWidth < 1536) {
    return 'xl';
  } else {
    return '2xl';
  }
};

export const useCurrentBreakpoint = () => {
  const screenWidth = useScreenWidth();
  const currentBreakpoint = useMemo(() => {
    if (!screenWidth) {
      return 'xs';
    } else {
      return calculateBreakpoint(screenWidth);
    }
  }, [screenWidth]);

  return currentBreakpoint;
};
