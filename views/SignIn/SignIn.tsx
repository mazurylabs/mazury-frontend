import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SocialButton } from 'components';
import { colors } from 'utils';

import { Connector, useConnect } from 'wagmi';
import { SignInModal } from './SignInModal';
import { setAddress } from '@/slices/user';

export const SignIn = () => {
  const [{ data }, connect] = useConnect();
  const dispatch = useDispatch();
  const [showSignInModal, setShowSigninModal] = React.useState(false);

  const metamaskConnector = data.connectors.find(
    (connector) => connector.id === 'injected'
  );
  const walletConnectConnector = data.connectors.find(
    (connector) => connector.id === 'walletConnect'
  );

  const showErrorPopup = () => {
    alert(
      'There was an error while trying to connect your wallet. Please try again later.'
    );
  };

  const handleCloseSignInModal = () => setShowSigninModal(false);

  const handleConnect = async (connector: Connector | undefined) => {
    if (!connector) {
      return showErrorPopup();
    }
    const res = await connect(connector);

    if (!res || res.error) {
      return showErrorPopup();
    }

    setShowSigninModal(true);

    const address = res.data.account;

    if (address) {
      dispatch(setAddress(address));
    } else {
      showErrorPopup();
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <h1 className="font-serif text-xl font-bold text-indigoGray-90">
        Choose your method
      </h1>

      <SocialButton
        backgroundColor={colors.blue[600]}
        label="QR Code"
        iconSrc="/icons/qrcode-scan.svg"
        className="mt-3"
        disabled={!walletConnectConnector}
        onClick={() => {
          handleConnect(walletConnectConnector);
        }}
      />
      <SocialButton
        backgroundColor={colors.amber[600]}
        label="Browser wallet"
        iconSrc="/icons/wallet.svg"
        className="mt-4"
        disabled={!metamaskConnector}
        onClick={() => {
          handleConnect(metamaskConnector);
        }}
      />

      <span className="mx-auto mt-2 text-xs text-indigoGray-50">
        Use this option for physical devices
      </span>

      <hr className="mt-12 w-full border border-indigoGray-20" />

      <h3 className="mt-12 font-serif text-xl font-bold text-indigoGray-90">
        What is this?
      </h3>

      <p className="mt-3 text-sm font-medium text-indigoGray-60">
        To sign into Mazury you need a web3 wallet to identify yourself. You
        don&apos;t need to pay for that and there are some nice apps that will
        do everything for you.
      </p>

      <p className="mt-3 text-sm font-medium text-indigoGray-60">
        For a mobile app we recommend{' '}
        <a
          href="https://rainbow.me/"
          className="font-semibold text-indigo-700"
          target="_blank"
          rel="noreferrer"
        >
          Rainbow
        </a>
        . If you prefer a browser extension, you can try{' '}
        <a
          href="https://metamask.io/"
          className="font-semibold text-indigo-700"
          target="_blank"
          rel="noreferrer"
        >
          Metamask
        </a>
      </p>

      {showSignInModal && <SignInModal onClose={handleCloseSignInModal} />}
    </div>
  );
};
