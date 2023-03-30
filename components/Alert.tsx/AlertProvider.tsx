import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Alert } from './Alert';

export interface AlertType {
  type: 'error' | 'success' | 'notification';
  message: string;
}

interface Context {
  dispatch: (alert?: AlertType) => void;
  alert?: AlertType;
  //   undo?: (callback: () => void) => void;
}

export const AlertContext = React.createContext<Context>({
  dispatch: () => null,
  alert: undefined,
});

export const AlertProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = React.useState<Context['alert']>();

  return (
    <AlertContext.Provider
      value={{
        alert,
        dispatch: (alert) => setAlert(alert),
      }}
    >
      <AlertContext.Consumer>
        {({ alert, dispatch }) => (
          <AnimatePresence key="alert">
            {alert && <Alert alert={alert} onClose={() => dispatch()} />}
          </AnimatePresence>
        )}
      </AlertContext.Consumer>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = ({ undo }: { undo?: () => void }): Context => {
  const context = React.useContext(AlertContext);

  if (!context) {
    throw new Error(
      'Ensure that you wrap any components in the OnboardingProvider component'
    );
  }

  return context;
};
