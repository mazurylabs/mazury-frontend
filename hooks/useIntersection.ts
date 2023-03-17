import { useState, useEffect } from 'react';

export const useIntersection = (
  element: HTMLElement | null,
  rootMargin?: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    if (element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setState(entry.isIntersecting);
        },
        { rootMargin }
      );

      element && observer.observe(element);

      return () => observer.unobserve(element);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, rootMargin]);

  return isVisible;
};
