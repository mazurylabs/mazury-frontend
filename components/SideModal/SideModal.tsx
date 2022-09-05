import { FC, useEffect } from 'react';
import ReactModal from 'react-modal';

interface SideModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  containerClassName?: string;
  appRootId?: string;
}

export const SideModal: FC<SideModalProps> = ({
  children,
  isOpen,
  onClose,
  containerClassName,
  appRootId = '__next',
}) => {
  useEffect(() => {
    ReactModal.setAppElement(document.getElementById(appRootId)!);
  }, [appRootId]);

  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling of background content when the modal is open
      document.body.style.overflow = 'hidden';
    }
    if (!isOpen) {
      // Reset the overflow style to the default once the modal has been closed
      document.body.style.overflow = 'unset';
    }
    return () => {
      // Reset the overflow style to the default once the modal has been unmounted
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div id="sideModal">
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        className={`absolute top-[0] right-[350px] h-full w-[350px] translate-x-[350px] overflow-y-auto bg-white bg-opacity-100 px-4 pt-4 shadow-lg outline-none ${containerClassName}`}
        data-testid="modal-container"
      >
        {children}
      </ReactModal>
    </div>
  );
};
