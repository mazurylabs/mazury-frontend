import Image from 'next/image';

const credentialSuggestions = [
  {
    title: 'Paradigm CTF 2022 Participant',
    slug: 'paradigm-ctf-2022-2022',
    img: '/badges/paradigm-ctf-2022.png',
    detail: 'Participants in Paradigm CTF 2022 challange',
  },
  {
    title: 'Ethereum Merge Contributor',
    slug: 'gitpoap-ethereum-merge-contributor-2022',
    img: '/badges/gitpoap-ethereum-merge-contributor-2022.png',
    detail: 'Significant contributors to the Ethereum Merge',
  },
  {
    title: 'ETHAmsterdam 2022 Staked Hacker',
    slug: 'ethamsterdam-2022-staked-hacker-2022',
    img: '/badges/ethamsterdam-2022-staked-hacker-2022.png',
    detail: 'Hackers who participated in ETHAmsterdam 2022',
  },
  {
    title: '2022 wagmi Contributor',
    slug: 'gitpoap-2022-wagmi-contributor-2022',
    img: '/badges/gitpoap-2022-wagmi-contributor-2022-logo-1662563704917.webp',
    detail: 'Open source developers who contributed to wagmi project in 2022',
  },
  {
    title: 'Ethereum Power User ZK Badge',
    slug: 'ethereum-power-user-zk-badge',
    img: '/badges/ethereum_power_users.svg',
    detail: 'ZK Badge owned by the most active users on Ethereum',
  },
  {
    title: '2022 OpenZeppelin Contracts for Cairo',
    slug: 'gitpoap-2022-openzeppelin-contracts-for-cairo-contributor-2022',
    img: '/badges/gitpoap-2022-openzeppelin-contracts-for-cairo-contributor-2022-logo-1663873330809.png',
    detail: 'Contributors to OpenZeppelin cairo contracts in 2022',
  },
];

export const IdleState = () => {
  return (
    <div className="w-full lg:flex">
      <div className="grow-[3] border-indigoGray-20 pb-7">
        <div className="mb-3 flex text-xs font-medium text-indigoGray-50">
          <h2>CREDENTIAL SEARCH SUGGESTIONS</h2>
        </div>
        <div className="px-2 font-sans font-medium lg:mr-12 lg:pt-0">
          <ul className="mb-4 grid grid-cols-1 lg:grid-cols-2">
            {credentialSuggestions.map((credential, index) => (
              <a href={`/search?badges=${credential.slug}`}>
                <li
                  key={index}
                  className=" flex cursor-pointer items-center py-2"
                >
                  <div className="mr-4 flex">
                    <Image
                      src={credential.img}
                      width={46}
                      height={46}
                      layout="fixed"
                      alt="badge"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-indigoGray-90">
                      {credential.title}
                    </p>

                    <p className="text-xs text-indigoGray-80 text-opacity-80">
                      {credential.detail}
                    </p>
                  </div>
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
