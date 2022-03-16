import React, { useEffect, useState } from 'react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { providers } from 'ethers';
import NextHead from 'next/head';
import { Connector, Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { SWRConfig } from 'swr';
import axios from 'axios';
import { OnboardingContext, OnboardingFormDataType } from 'contexts';
import { PersonBasicDetails } from 'types';

// Get environment variables
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: 'Mazury',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      infuraId,
    }
  );
const webSocketProvider = ({ chainId }: ProviderConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

const App = ({ Component, pageProps }: AppProps) => {
  const [onboardingFormData, setOnboardingFormData] =
    useState<OnboardingFormDataType>({
      username: '',
      role_community_manager: false,
      role_creator: false,
      role_investor: false,
      role_developer: false,
      role_designer: false,
      role_researcher: false,
      role_trader: false,
      open_to_opportunities: false,
    });
  const [fetchedProfile, setFetchedProfile] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [referralReceiver, setReferralReceiver] =
    useState<PersonBasicDetails>();
  const [twitterConnected, setTwitterConnected] = useState(false);

  useEffect(() => {
    console.log(`                                                   
 ____   _____  _____  _   _   ____  _   _ 
 |    \ (____ |(___  )| | | | / ___)| | | |
 | | | |/ ___ | / __/ | |_| || |    | |_| |
 |_|_|_|\_____|(_____)|____/ |_|     \__  |
                                    (____/ 
  `);
  }, []);

  return (
    <SWRConfig value={{ fetcher }}>
      <Provider
        autoConnect
        connectors={connectors}
        provider={provider}
        webSocketProvider={webSocketProvider}
      >
        <OnboardingContext.Provider
          value={{
            formData: onboardingFormData,
            setFormData: setOnboardingFormData,
            fetched: fetchedProfile,
            setFetched: setFetchedProfile,
            avatarFile,
            setAvatarFile,
            referralReceiver,
            setReferralReceiver,
            twitterConnected,
            setTwitterConnected,
          }}
        >
          <NextHead>
            <title>Mazury</title>
          </NextHead>

          <Component {...pageProps} />
        </OnboardingContext.Provider>
      </Provider>
    </SWRConfig>
  );
};

export default App;
