import clsx from 'clsx';

import { Avatar } from 'components';
import { useRouter } from 'next/router';

import { Badge, Profile } from 'types';
import {
  commify,
  getHighlightedBadges,
  getRoles,
  returnTruncatedIfEthAddress,
} from 'utils';

const Tag = ({
  label,
  highlighted,
}: {
  label?: string;
  highlighted?: boolean;
}) => {
  return (
    <p
      className={clsx(
        highlighted && 'bg-emerald-50 text-emerald-900',
        'flex h-fit w-fit items-center rounded bg-indigoGray-5 px-2 py-1 font-sans text-xs font-bold text-indigoGray-90'
      )}
    >
      {(label as string)[0].toUpperCase() + label?.slice(1)}
    </p>
  );
};

interface Props {
  result?: Profile[];
}

export const Talent = ({ result }: Props) => {
  const { query } = useRouter();

  const composeRoles = (data: Profile) => getRoles(data, query);
  const composeBadges = (data: Badge[]) => getHighlightedBadges(data, query);

  return (
    <div className="space-y-4">
      {result?.map((result) => {
        const { roles, remainder: roleRemainder } = composeRoles(result);
        const { badges, remainder } = composeBadges(result.top_badges);

        return (
          <li
            key={result.id}
            className="list-none space-y-4 rounded-2xl border border-indigoGray-20 p-4 shadow-sm lg:space-y-0"
          >
            <div className="flex items-center  ">
              <div>
                <Avatar
                  src={result.avatar}
                  height={40}
                  width={40}
                  alt={result?.username}
                />
              </div>

              <div className="ml-3 flex flex-col items-start space-y-2 ">
                <p className="font-serif text-xl font-bold leading-6 text-indigoGray-90">
                  {returnTruncatedIfEthAddress(result.username)}
                </p>

                <div className="flex flex-col lg:flex-row">
                  <p className="hidden font-sans text-xs font-medium leading-[18px] text-indigoGray-50 lg:flex">
                    {commify(result.referred_by.length)} referral
                    {result.referred_by.length > 1 && 's'}
                  </p>

                  {roles.length !== 0 && (
                    <div className="flex space-x-2 lg:hidden">
                      {roles.map((role, index) => (
                        <Tag
                          key={(role?.title as string) + result.id + index}
                          highlighted={role?.hightlighted}
                          label={role?.title}
                        />
                      ))}

                      {Boolean(roleRemainder) && <p>{roleRemainder} more</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden items-center lg:ml-auto lg:flex">
                {roles.length !== 0 && (
                  <>
                    <div className="space-x-2 lg:flex">
                      {roles.map((role, index) => (
                        <Tag
                          key={(role?.title as string) + result.id + index}
                          highlighted={role?.hightlighted}
                          label={role?.title}
                        />
                      ))}

                      {Boolean(roleRemainder) && <p>{roleRemainder} more</p>}
                    </div>

                    <div className="mx-[15px] h-[43px] w-[1px] bg-indigoGray-90 opacity-[0.05]" />
                  </>
                )}

                <div className="hidden space-x-2 lg:flex">
                  {badges.map((badge) => (
                    <Tag
                      key={badge.title + result.id}
                      highlighted={badge?.hightlighted}
                      label={badge.title}
                    />
                  ))}

                  {Boolean(remainder) && <p>{remainder} more</p>}
                </div>
              </div>

              <div className="ml-auto self-start lg:hidden">
                <p className="font-sans text-xs font-medium leading-[18px] text-indigoGray-50 lg:flex">
                  {commify(result.referred_by.length)} referral
                  {result.referred_by.length > 1 && 's'}
                </p>
              </div>
            </div>

            <div className="flex space-x-2 lg:hidden">
              {badges.map((badge) => (
                <Tag
                  key={badge.title + result.id}
                  highlighted={badge?.hightlighted}
                  label={badge.title}
                />
              ))}

              {Boolean(remainder) && <p>{remainder} more</p>}
            </div>
          </li>
        );
      })}
    </div>
  );
};

// import { motion } from 'framer-motion';
// import { FC, useState } from 'react';
// import { SidebarContext } from 'contexts';
// import { MobileSidebar } from '../MobileSidebar/MobileSidebar';
// import { Sidebar } from 'components';

// interface LayoutProps {
//   sidebarContent?: React.ReactNode;
//   innerLeftContent?: React.ReactNode;
//   innerRightContent?: React.ReactNode;
//   headerContent?: React.ReactNode;
//   variant?: 'three-part' | 'plain';
//   children?: React.ReactNode;
// }

// export const Layout: FC<LayoutProps> = ({
//   sidebarContent = <Sidebar />,
//   innerLeftContent,
//   innerRightContent,
//   headerContent,
//   variant = 'three-part',
//   children,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [signInOpen, setSignInOpen] = useState(false);

//   return (
//     <div
//       className="flex h-screen w-full flex-col"
//       data-testid="layout-container"
//     >
//       <SidebarContext.Provider
//         value={{ isOpen, setIsOpen, signInOpen, setSignInOpen }}
//       >
//         <motion.aside
//           className={`fixed top-0 z-20 hidden h-screen w-[75px] flex-col bg-white py-10 ${
//             isOpen && 'px-5'
//           } shadow-inner lg:flex`}
//           whileHover={{
//             width: signInOpen ? '300px' : '200px',
//           }}
//           onMouseEnter={() => setIsOpen(true)}
//           onMouseLeave={() => setIsOpen(false)}
//           role="menu"
//         >
//           {sidebarContent}
//         </motion.aside>
//       </SidebarContext.Provider>

//       <main className="mx-auto flex  h-full w-full flex-col gap-8 px-0 pt-0 md:px-8 lg:ml-[75px] lg:w-11/12">
//         {variant === 'three-part' && (
//           <>
//             {headerContent}

//             <div className="flex h-full grow flex-col gap-8 md:flex-row">
//               <div className="hidden w-full flex-col gap-4 md:flex md:w-3/12">
//                 {innerLeftContent}
//               </div>

//               <div className="flex w-full grow flex-col gap-8 px-4 md:w-9/12 md:px-0">
//                 {innerRightContent}
//               </div>
//             </div>
//           </>
//         )}
//         {variant === 'plain' && <>{children}</>}
//       </main>

//       <MobileSidebar />
//     </div>
//   );
// };
