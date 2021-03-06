import type { NextPage } from 'next';
import Image from 'next/image';
import { useAccount, useConnect } from 'wagmi';
import { Button } from 'components';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const { connected } = data;
  const router = useRouter();

  if (connected) {
    return (
      <div className="py-24 text-center">
        <Image
          src="/waves.png"
          alt="Mazury logo"
          height="50"
          width="50"
          className="rounded-full"
        />
        <p className="text-2xl font-bold">
          Welcome {accountData?.ens?.name || accountData?.address}
        </p>
        <Button className="mx-auto mt-10" onClick={disconnect}>
          Disconnect
        </Button>

        <Button
          variant="secondary"
          className="mx-auto mt-6"
          onClick={() => router.push('/onboarding')}
        >
          Start onboarding
        </Button>
      </div>
    );
  }

  return (
    <div className="py-24 text-center">
      <Image
        src="/waves.png"
        alt="Mazury logo"
        height="50"
        width="50"
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold">Welcome to Mazury</h1>
      <p className="mt-10">Connect your wallet:</p>
      <div className="mt-5 flex justify-center gap-6">
        {data.connectors.map((x) => (
          <Button
            className="rounded bg-slate-200 p-2"
            key={x.id}
            onClick={() => connect(x)}
          >
            {x.name}
            {!x.ready && ' (unsupported)'}
          </Button>
        ))}
      </div>

      {error && (
        <p className="text-red-500">{error?.message ?? 'Failed to connect'}</p>
      )}
    </div>
  );
};

export default Home;
