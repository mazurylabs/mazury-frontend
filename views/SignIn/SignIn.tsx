import { HR, SocialButton } from 'components';
import { useEffect } from 'react';
import { colors } from 'utils';
import {
  chain,
  defaultChains,
  InjectedConnector,
  useAccount,
  useConnect,
} from 'wagmi';

// // Get environment variables
// const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

// // Pick chains
// const chains = defaultChains;
// const defaultChain = chain.mainnet;

// const rpcUrl =
//   chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? defaultChain.rpcUrls[0];

// const metamaskConnector = new InjectedConnector();

export const SignIn = () => {
  const [{ data }] = useConnect();
  const [_, disconnect] = useAccount();

  const metamaskConnector = data.connectors.find(
    (connector) => connector.id === 'injected'
  );
  const walletConnectConnector = data.connectors.find(
    (connector) => connector.id === 'walletConnect'
  );

  useEffect(() => {
    console.log({ connected: data.connected });
  }, [data.connected]);

  if (data.connected) {
    return (
      <div>
        <p>Connected</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-serif text-xl font-bold text-indigoGray-90">
        Choose your method
      </h1>

      <SocialButton
        backgroundColor={colors.blue[600]}
        label="QR Code"
        iconSrc="/icons/qrcode-scan.svg"
        className="mt-3"
        onClick={() => walletConnectConnector?.connect()}
      />
      <SocialButton
        backgroundColor={colors.amber[600]}
        label="Browser wallet"
        iconSrc="/icons/wallet.svg"
        className="mt-4"
        onClick={() => metamaskConnector?.connect()}
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
          className="font-semibold"
          target="_blank"
          rel="noreferrer"
        >
          Rainbow
        </a>
        . If you prefer a browser extension, you can try{' '}
        <a
          href="https://metamask.io/"
          className="font-semibold"
          target="_blank"
          rel="noreferrer"
        >
          Metamask
        </a>
      </p>
    </div>
  );
};
