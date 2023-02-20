import * as React from 'react';

import {
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import { useMobile } from './useMobile';

let scrollThreshold = [0, 90];

export const useAnimateOnScroll = () => {
  const isMobile = useMobile();
  const { scrollY } = useViewportScroll();
  const scrollYOnDirectionChange = React.useRef(scrollY.get());
  const lastPixelsScrolled = React.useRef<number>(null!);
  const lastScrollDirection = React.useRef<string>(null!);

  const pixelsScrolled = useMotionValue(0);
  const height = useTransform(pixelsScrolled, scrollThreshold, [100, 56]);
  const avatarHeight = useTransform(pixelsScrolled, scrollThreshold, [100, 40]);

  const fontSizeThreshold = useTransform(
    pixelsScrolled,
    scrollThreshold,
    [24, 18]
  );
  const fontSize = useMotionTemplate`${fontSizeThreshold}px`;

  const top = useTransform(pixelsScrolled, scrollThreshold, [-26, 0]);
  const opacity = useTransform(pixelsScrolled, [0, 114], [1, 0]);
  const backgroundOpacity = useTransform(pixelsScrolled, [0, 114], [0, 1]);
  const backgroundColor = useMotionTemplate`rgba(241 243 249 / ${backgroundOpacity})`;

  React.useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest < 0 || !isMobile) return;

      let isScrollingDown = scrollY.getPrevious() - latest < 0;
      let scrollDirection = isScrollingDown ? 'down' : 'up';
      let currentPixelsScrolled = pixelsScrolled.get();
      let newPixelsScrolled;

      if (lastScrollDirection.current !== scrollDirection) {
        lastPixelsScrolled.current = currentPixelsScrolled;
        scrollYOnDirectionChange.current = latest;
      }

      if (isScrollingDown) {
        newPixelsScrolled = Math.min(
          lastPixelsScrolled.current +
            (latest - scrollYOnDirectionChange.current),
          scrollThreshold[1]
        );
      } else {
        newPixelsScrolled = Math.max(
          lastPixelsScrolled.current -
            (scrollYOnDirectionChange.current - latest),
          scrollThreshold[0]
        );
      }

      pixelsScrolled.set(newPixelsScrolled);
      lastScrollDirection.current = scrollDirection;
    });
  }, [pixelsScrolled, scrollY]);

  return {
    height,
    avatarHeight,
    fontSize,
    top,
    opacity,
    backgroundColor,
  };
};
