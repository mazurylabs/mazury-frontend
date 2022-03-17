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
  appRootId = '__next',
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
      className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white bg-opacity-100 py-4 px-6 shadow-xl ${containerClassName}`}
      data-testid="modal-container"
      overlayClassName="bg-black-900 bg-opacity-50 h-screen w-screen absolute top-0 left-0"
    >
      {children}
    </ReactModal>
  );
};
