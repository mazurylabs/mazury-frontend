import type { NextPage } from 'next';
import { useAccount, useConnect } from 'wagmi';
import { Button } from '../components';

const Home: NextPage = () => {
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const { connected } = data;

  if (connected) {
    return (
      <div>
        <p className='text-2xl font-bold'>
          Welcome {accountData?.ens?.name || accountData?.address}
        </p>
        <Button className='mt-10' onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>Welcome to Mazury</h1>
      <p className='mt-10'>Connect your wallet:</p>
      <div className='flex gap-6 justify-center mt-5'>
        {data.connectors.map((x) => (
          <Button
            className='bg-slate-200 p-2 rounded'
            key={x.id}
            onClick={() => connect(x)}
          >
            {x.name}
            {!x.ready && ' (unsupported)'}
          </Button>
        ))}
      </div>

      {error && (
        <p className='text-red-500'>{error?.message ?? 'Failed to connect'}</p>
      )}
    </div>
  );
};

export default Home;
