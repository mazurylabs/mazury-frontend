import { Checkbox, Layout } from 'components';
import Link from 'next/link';
import Image from 'next/image';

import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';

const JobApply = () => {
  const [value, setValue] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const listenToScroll = () => {
    let heightToShowFrom = 1;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll < heightToShowFrom) {
      isVisible && // to limit setting state only the first time
        setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return (
    <Layout variant="plain">
      <main className="lg:hidden">
        <div className="sticky top-0 z-10 mt-9 bg-white">
          <div className="mb-3 px-4 lg:mb-4">
            <Link href="/jobs/job-post">
              <SVG src="/icons/arrow-left.svg" height={24} width={24} />
            </Link>
          </div>

          <h3 className="mb-2 px-4 text-sm font-medium text-indigoGray-40">
            NFT x DeFi Content Writer
          </h3>
          <h2 className="px-4 text-xl font-normal text-indigoGray-90">
            Apply to job post
          </h2>

          {isVisible && (
            <div className="border-b-2 border-solid border-indigoGray-20 pt-4" />
          )}
        </div>

        <div className="px-4 pt-2">
          <form>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="mb-0.5 flex gap-1 text-sm font-light text-indigoGray-40"
              >
                E-mail <span className="text-indigoGray-30">(Required)</span>
              </label>
              <input
                type="text"
                id="email"
                className="h-[45px] w-full rounded-lg border border-indigoGray-20 pl-4 text-sm font-normal text-indigoGray-90 caret-indigoGray-90"
              />
            </div>

            <div className="z-0 mb-3">
              <label
                htmlFor="file"
                className="mb-0.5 flex gap-1 text-sm font-light text-indigoGray-40"
              >
                Resume <span className="text-indigoGray-30">(Required)</span>
              </label>
              <div className="relative flex h-full w-full items-center">
                <input
                  id="file"
                  className="h-[45px] w-full rounded-lg border border-indigoGray-20 pl-4 text-sm font-normal text-indigoGray-90 caret-indigoGray-90"
                />
                <button className="absolute right-4 text-xs font-medium text-violet-700">
                  Upload file
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="website"
                className="mb-0.5 flex gap-1 text-sm font-light text-indigoGray-40"
              >
                Website <span className="text-indigoGray-30">(Required)</span>
              </label>
              <input
                type="text"
                id="website"
                className="h-[45px] w-full rounded-lg border border-indigoGray-20 pl-4 text-sm font-normal text-indigoGray-90 caret-indigoGray-90"
              />
              <span className="mb-3 flex flex-row items-center gap-[5px] text-xs font-normal text-indigoGray-40">
                <SVG src="/icons/alert.svg" height={12} width={12} />
                Own website, Twitter, discord or any other
              </span>
            </div>
          </form>

          <div>
            <h4 className="text-medium text-sm text-indigoGray-40">
              Mazury profile
            </h4>
            <div className="my-1 flex flex-row items-center gap-3">
              <Image
                src="/Avatar.png"
                width="40px"
                height="40px"
                alt="user profile avatar"
              />
              <h4 className="text-bold text-sm lowercase text-indigoGray-90">
                tranqui
              </h4>
            </div>
            <p className="text-xs font-normal lowercase text-indigoGray-50">
              We will send your Mazury profile along with the application!
            </p>
          </div>

          <div className="my-3 rounded-md bg-indigo-50 py-3 px-3">
            <p className="text-left text-xs font-medium text-indigo-900">
              It’s rare to have all the stand-out credentials. You can apply
              anyway and if you want us to help with your profile, use talent
              match!
            </p>
            <Link href="#">
              <span className="mb-1 text-xs font-semibold text-indigo-600">
                Send us a message
              </span>
            </Link>
          </div>

          <div className="mb-3">
            <label
              htmlFor="message"
              className="mb-0.5 flex gap-1 text-sm font-light text-indigoGray-40"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Hi, I wanted to apply because..."
              className="h-[227px] w-full resize-none rounded-lg border border-indigoGray-20 pl-4 pt-[12.75px] text-sm font-normal text-indigoGray-90 caret-indigoGray-90"
            ></textarea>
          </div>

          <Checkbox
            label="Save my data for future applications"
            id="open-to-new-checkbox"
            outerClassName="mt-[13.5px] mb-[67.5px]"
            checked={value}
            setChecked={setValue}
          />

          <div className="bottom-18 z-1 sticky w-full bg-white pb-4">
            <Link href="#">
              <button className="h-11 w-full rounded-lg bg-indigoGray-90 text-sm text-indigoGray-5 lg:hidden">
                Send application
              </button>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default JobApply;
