import { NextPage } from 'next';
import Image from 'next/image';
import { Button, SettingsLayout } from 'components';

const EthAddressPage: NextPage = () => {
  //Dummy data
  const data = [
    {
      username: 'wojtek.eth',
      address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    },
    {
      username: 'Blob.eth',
      address: '0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3',
    },
  ];

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Eth addresses</h2>
          </div>

          <div className="mt-6 flex grow flex-col">
            <div className="flex grow flex-col justify-between md:mb-8 md:grow-0">
              <div className="grow">
                {data.map((data, index) => (
                  <div
                    key={data.username + index}
                    className="mb-8 flex items-center md:justify-between"
                  >
                    <div className="font-inter mr-10 max-w-[83%] shrink md:max-w-full">
                      <p className="font-bold">{data.username}</p>
                      <p className=" break-words text-xs font-medium leading-[18px] text-black-700">
                        {data.address}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <button type="button" aria-label="delete">
                        <Image
                          src="/icons/trash.svg"
                          alt="Back"
                          width="16px"
                          height="16px"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full uppercase" size="large">
                CONNECT WALLET
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EthAddressPage;
