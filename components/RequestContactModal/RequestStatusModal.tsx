import SVG from 'react-inlinesvg';
import { FC, useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  containerClassName?: string;
  appRootId?: string;
}

export const RequestStatusModal: FC<ModalProps> = ({
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
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      className={`absolute left-0 bottom-0 h-[375px] w-full rounded-xl bg-white bg-opacity-100 p-6 shadow-xl outline-none lg:top-[50%] lg:left-[50%] lg:h-[386px] lg:w-[600px] lg:translate-x-[-50%] lg:translate-y-[-50%] ${containerClassName}`}
      data-testid="modal-container"
      overlayClassName="bg-black-900 bg-opacity-50 h-screen w-screen fixed top-0 left-0 z-40"
    >
      <button onClick={onClose} className="flex w-full justify-end">
        <span className="sr-only">Close Modal</span>
        <SVG src="/icons/x.svg" height={24} width={24} />
      </button>

      <div className="flex flex-col justify-between">
        {children}

        <button
          type="button"
          className="flex h-[45px] w-full items-center justify-end rounded-lg bg-indigoGray-90 pr-[23px] font-sans text-sm font-semibold text-indigoGray-5 lg:justify-center"
          onClick={onClose}
        >
          Go back
        </button>
      </div>
    </ReactModal>
  );
};
