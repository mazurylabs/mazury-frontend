import { useCurrentBreakpoint } from './useCurrentBreakpoint';

export const useMobile: (includeTablets?: boolean) => boolean = (
  includeTablets = true
) => {
  const currentBreakpoint = useCurrentBreakpoint();
  const isMobile =
    currentBreakpoint === 'xs' ||
    currentBreakpoint === 'sm' ||
    (includeTablets && currentBreakpoint === 'md');

  return isMobile;
};
