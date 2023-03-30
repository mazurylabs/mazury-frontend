import * as React from 'react';
import { motion } from 'framer-motion';

import { capitalize } from 'utils';

import { AlertType } from './AlertProvider';

interface AlertProps {
  alert: AlertType;
  onClose: () => void;
}

const variants = {
  visible: { x: '-50%', y: 0, opacity: 1 },
  hidden: { x: '-50%', y: 100, opacity: 0.5 },
};

export const Alert: React.FC<AlertProps> = ({ alert, onClose }) => {
  React.useEffect(() => {
    let timeout = setTimeout(onClose, 5000); //Close the notification after 2 seconds

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="rounded-md z-30 fixed bottom-0 left-[50%] translate-x-[-50%] w-[calc(100vw-32px)] sm:w-[calc(100vw-64px)] xl:w-[810px]  mb-8 p-4 space-x-6 flex items-center bg-indigoGray-90"
    >
      <p className="font-sans text-xs font-medium text-indigoGray-5">
        {capitalize(alert.message)}
      </p>
      <button className="font-sans text-xs font-semibold text-indigoGray-5">
        Undo
      </button>
    </motion.div>
  );
};
