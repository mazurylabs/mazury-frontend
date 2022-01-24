import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { useEnsLookup } from 'wagmi';
import { Button, Avatar } from '../../components';
import { NavButton } from '../../components/NavButton';
import { getTruncatedAddress } from '../../utils';

interface Props {
  address: string;
  ens?: string;
}

const Profile: NextPage<Props> = ({ address }) => {
  const [{ data: ens }] = useEnsLookup({
    address,
  });

  return (
    <div>
      <div className='flex gap-8 py-12 px-24 items-center'>
        <Button>&lt;</Button>
        <p>{ens || getTruncatedAddress(address)}</p>

        <input
          type='text'
          className='ml-auto border-2 w-6/12 p-2 rounded-lg'
          placeholder='Search with love...'
        />
      </div>

      <div className='flex gap-8 pb-12 pt-0 px-24'>
        <Avatar src='/avi.png' />

        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-4xl'>
            {ens || getTruncatedAddress(address, 5)}
          </h1>
          <p>{getTruncatedAddress(address, 5)}</p>

          <div className='flex gap-6'>
            <Button>Twitter</Button>
            <Button>E-mail</Button>
            <Button>Discord</Button>
          </div>
        </div>

        <div className='ml-auto flex gap-16 pr-16'>
          <div className='flex flex-col items-center gap-0'>
            <div className='font-bold text-3xl'>24</div>
            <div className='text-sm'>Referrals</div>
          </div>
          <div className='flex flex-col items-center gap-0'>
            <div className='font-bold text-3xl'>62k</div>
            <div className='text-sm'>Badges</div>
          </div>
          <div className='flex flex-col items-center gap-0'>
            <div className='font-bold text-3xl'>23</div>
            <div className='text-sm'>Posts</div>
          </div>
        </div>
      </div>

      <hr />

      <div className='flex py-10 px-24 gap-12'>
        <div className='flex flex-col gap-4 justify-start'>
          <NavButton label='Activity' color='purple' />
          <NavButton label='Badges' color='pink' />
          <NavButton label='Referrals' color='green' />
          <NavButton label='Blog posts' color='brown' />
          <NavButton label='DAOs' color='lemon' />
          {/* <p className='text-purple'>purple</p>
          <p className='text-pink'>pink</p>
          <p className='text-green'>green</p>
          <p className='text-brown'>brown</p>
          <p className='text-lemon'>lemon</p> */}

        </div>

        <div className='flex flex-col'>
          <h3 className='text-lg font-bold'>Recent activity</h3>
          <div className='mt-4 flex flex-col gap-8'>
            <div className='flex gap-8'>
              <Avatar src='/blue-ph.png' width='80px' height='80px' />
              <div className='flex flex-col justify-center'>
                <p className='text-sm'>Event</p>
                <p>
                  Getting seen in web3 with Alec.eth (head of talent @ ConsenSys
                  mesh, building peepledao) — mazury community call #1
                </p>
              </div>
            </div>

            <div className='flex gap-8'>
              <Avatar src='/blue-ph.png' width='80px' height='80px' />
              <div className='flex flex-col justify-center'>
                <p className='text-sm'>Vote</p>
                <p>Partnership & Mutual Grant with Gitcoin</p>
              </div>
            </div>
          </div>

          <div className='flex gap-12 w-full'>
            <div className='w-1/2'>
              <h3 className='mt-8 text-lg font-bold'>Recent badges</h3>
              <div className='flex mt-4 gap-8'>
                <div className='flex flex-col'>
                  <Avatar src='/yellow-ph.png' borderRadius='7px' />
                  <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                  <p className='text-sm'>Moon school</p>
                </div>

                <div className='flex flex-col'>
                  <Avatar src='/yellow-ph.png' borderRadius='7px' />
                  <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                  <p className='text-sm'>Moon school</p>
                </div>
              </div>
            </div>

            <div className='w-1/2'>
              <h3 className='mt-8 text-lg font-bold'>Recent POAPs</h3>
              <div className='flex mt-4 gap-8'>
                <Avatar src='/blue-ph.png' />
                <Avatar src='/blue-ph.png' />
              </div>
            </div>
          </div>

          <hr className='my-8' />

          <div>
            <h2 className='text-3xl font-bold'>Badges</h2>
            <div className='flex gap-8 mt-4'>
              <Link href='#' passHref>
                <a className='text-xl font-bold'>Mazury badges</a>
              </Link>
              <Link href='#' passHref>
                <a className='text-xl'>Badges</a>
              </Link>
              <Link href='#' passHref>
                <a className='text-xl'>Badges</a>
              </Link>
              <Link href='#' passHref>
                <a className='text-xl'>Badges</a>
              </Link>
            </div>

            <div className='w-1/2'>
              <h3 className='mt-8 text-lg font-bold'>Recent badges</h3>
              <div className='flex mt-4 gap-8'>
                <div className='flex flex-col'>
                  <Avatar src='/yellow-ph.png' borderRadius='7px' />
                  <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                  <p className='text-sm'>Moon school</p>
                </div>

                <div className='flex flex-col'>
                  <Avatar src='/yellow-ph.png' borderRadius='7px' />
                  <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                  <p className='text-sm'>Moon school</p>
                </div>

                <div className='flex flex-col'>
                  <Avatar src='/yellow-ph.png' borderRadius='7px' />
                  <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                  <p className='text-sm'>Moon school</p>
                </div>

                <div className='flex flex-col'>
                  <Avatar src='/yellow-ph.png' borderRadius='7px' />
                  <p className='font-bold text-xl mt-2'>Web3 on wheels</p>
                  <p className='text-sm'>Moon school</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='mb-20' />
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      address: context.query.address,
    },
  };
};
