import { Checkbox, Input, Layout } from 'components';
import Link from 'next/link';
import Image from 'next/image';

import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';

const SeeApplicationsModal = () => {
  const [value, setValue] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="hidden w-full lg:block">
      <div
        className="flex w-full cursor-pointer justify-end lg:mb-3"
        onClick={() => setIsOpen(false)}
      >
        <button type="button" aria-label="close sidebar">
          <SVG src="/icons/Close.svg" height={24} width={24} />
        </button>
      </div>

      <h2 className="font-sans text-xl font-normal text-indigoGray-90">
        Applications
      </h2>

      {/* <div className="pt-2">
        
      </div> */}
      <section className="mt-6">
        <h4 className="mb-3.5 font-sans text-sm font-medium text-indigoGray-40">
          Applications with all recommended badges
        </h4>

        <div className="grid grid-flow-row gap-[28px]">
          <div className="flex justify-between">
            <div className="my-1 flex flex-row items-center gap-3">
              <Image
                src="/Avatar.png"
                width="40px"
                height="40px"
                alt="user profile avatar"
                className="rounded-full"
              />
              <div>
                <h4 className="text-bold font-serif text-sm font-medium lowercase text-indigoGray-90">
                  tranqui
                </h4>

                <div className="flex flex-row items-center gap-2">
                  <div className="h-[12px] w-[12px] rounded-full">
                    <div className="h-[100%] w-[100%] rounded-full border-[1.33px] border-green-600" />
                  </div>
                  <p className="flex flex-row  font-sans text-xs font-medium text-green-600">
                    9 / 9
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="mr-3 h-[22px] w-[70px] rounded-md bg-blue-50">
                <p className="grid place-items-center text-center font-sans text-xs font-medium capitalize text-blue-700">
                  Unread
                </p>
              </div>

              <p className=" text-center font-sans text-xs font-medium text-indigoGray-40">
                21/10/2022 <br />
                13:40 CET
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="my-1 flex flex-row items-center gap-3">
              <Image
                src="/avatar-3.png"
                width="40px"
                height="40px"
                alt="user profile avatar"
                className="rounded-full"
              />

              <div>
                <h4 className="text-bold font-serif text-sm font-medium lowercase text-indigoGray-90">
                  sebastian
                </h4>

                <div className="flex flex-row items-center gap-2">
                  <div className="h-[12px] w-[12px] rounded-full">
                    <div className="h-[100%] w-[100%] rounded-full border-[1.33px] border-green-600" />
                  </div>
                  <p className="flex flex-row  font-sans text-xs font-medium text-green-600">
                    9 / 9
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <p className=" text-center font-sans text-xs font-medium text-indigoGray-40">
                21/10/2022 <br />
                13:40 CET
              </p>
            </div>
          </div>
        </div>

        <div className="my-8 border border-solid border-indigoGray-20" />

        <h4 className="mb-3.5 font-sans text-sm font-medium text-indigoGray-40">
          Applications without all recommended badges
        </h4>

        <div className="grid grid-flow-row gap-[28px]">
          <div className="flex justify-between">
            <div className="my-1 flex flex-row items-center gap-3">
              <Image
                src="/avatar-4.png"
                width="40px"
                height="40px"
                alt="user profile avatar"
                className="rounded-full"
              />
              <div>
                <h4 className="text-bold font-serif text-sm font-medium lowercase text-indigoGray-90">
                  nazeeh
                </h4>

                <div className="flex flex-row items-center gap-2">
                  <div className="h-[12px] w-[12px] rounded-full">
                    <div className="h-[100%] w-[100%] rounded-full border-[1.33px] border-green-600" />
                  </div>
                  <p className="flex flex-row  font-sans text-xs font-medium text-green-600">
                    9 / 9
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center">
              <div className="mr-3 h-[22px] w-[70px] rounded-md bg-blue-50">
                <p className="grid place-items-center text-center font-sans text-xs font-medium capitalize text-blue-700">
                  Unread
                </p>
              </div>

              <p className=" text-center font-sans text-xs font-medium text-indigoGray-40">
                21/10/2022 <br />
                13:40 CET
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SeeApplicationsModal;
