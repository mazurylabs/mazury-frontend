import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

interface PortalProps {
  children: React.ReactNode;
  container: string;
}

export const Portal = ({ container, children }: PortalProps) => {
  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.querySelector(container);

    modalRoot?.appendChild(element.current);

    return () => {
      modalRoot?.removeChild(element.current);
    };
  }, []);

  return createPortal(children, element.current);
};
