import { FC, useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  containerClassName?: string;
  appRootId?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  containerClassName,
  appRootId = '_next',
}) => {
  useEffect(() => {
    ReactModal.setAppElement(document.getElementById(appRootId)!);
  }, [appRootId]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      className={`top-20 h-[70vh] border-2 p-4 ${containerClassName}`}
      data-testid="modal-container"
    >
      {children}
    </ReactModal>
  );
};
