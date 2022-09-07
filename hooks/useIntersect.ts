import { useEffect, useRef, useState } from 'react';

export const useIntersect = ({
  root = null,
  rootMargin,
  threshold = 0,
}: { root?: any; rootMargin?: string; threshold?: number } = {}): any => {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef<any>(null!);

  useEffect(() => {
    const isSupported =
      'IntersectionObserver' in window &&
      'IntersectionObserverEntry' in window &&
      'intersectionRatio' in window.IntersectionObserverEntry.prototype;

    if (!isSupported) {
      return setEntry({ isIntersecting: true });
    }

    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      ([entry]) => setEntry(entry),
      {
        root,
        rootMargin,
        threshold,
      }
    );

    if (node) observer.current.observe(node);

    return () => observer.current.disconnect;
  }, [node, root, rootMargin, threshold]);

  return { ref: setNode, entry };
};
