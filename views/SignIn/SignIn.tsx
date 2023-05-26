import * as React from 'react';
import { SocialButton } from 'components';
import { colors } from 'utils';

import { Connector, useConnect } from 'wagmi';
import { SignInModal } from './SignInModal';
import storage from 'utils/storage';
import { USER_ADDRESS } from 'config';

export const SignIn = () => {
  const { connectors, connectAsync } = useConnect();
  const [showSignInModal, setShowSigninModal] = React.useState(false);

  const metamaskConnector = connectors.find(
    (connector) => connector.id === 'metaMask'
  );
  const coinbaseWalletConnector = connectors.find(
    (connector) => connector.id === 'coinbaseWallet'
  );
  const walletConnectConnector = connectors.find(
    (connector) => connector.id === 'walletConnect'
  );

  const handleCloseSignInModal = () => {
    setShowSigninModal(false);
  };

  const handleConnect = async (connector: Connector | undefined) => {
    const { account } = await connectAsync({ connector });

    if (account) {
      setShowSigninModal(true);
      storage.setToken(account, USER_ADDRESS);
    }
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden py-6 lg:w-full">
      <h1 className="font-serif text-xl font-bold text-indigoGray-90">
        Choose your method
      </h1>

      <SocialButton
        backgroundColor={colors.walletconnect}
        label="WalletConnect"
        iconSrc="/icons/walletconnect-logo.svg"
        className="mt-3"
        disabled={!walletConnectConnector}
        onClick={() => {
          handleConnect(walletConnectConnector);
        }}
      />
      <SocialButton
        backgroundColor={colors.coinbase}
        label="Coinbase"
        iconSrc="/icons/coinbase-logo.svg"
        className="mt-3"
        disabled={!coinbaseWalletConnector}
        onClick={() => {
          handleConnect(coinbaseWalletConnector);
        }}
      />
      <SocialButton
        backgroundColor={colors.metamask}
        label="Browser wallet"
        iconSrc="/icons/wallet.svg"
        className="mt-3"
        disabled={!metamaskConnector}
        onClick={() => {
          handleConnect(metamaskConnector);
        }}
      />

      <span className="mx-auto mt-2 text-xs text-indigoGray-50">
        Use this option for hardware wallets
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
