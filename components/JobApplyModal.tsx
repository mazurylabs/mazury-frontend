import { Checkbox, Input, Layout } from 'components';
import Link from 'next/link';
import Image from 'next/image';

import SVG from 'react-inlinesvg';
import { useEffect, useState } from 'react';

const JobApplyModal = () => {
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
        Apply to job post
      </h2>

      <div className="pt-2">
        <form className="space-y-3">
          <Input
            id="username"
            label={
              <div className="mb-0.5 flex gap-1 font-sans text-sm font-light">
                Username <span className="text-indigoGray-30">(Required)</span>
              </div>
            }
            className="h-[45px] w-full rounded-lg !border border-indigoGray-20 pl-4 font-sans text-sm font-medium text-indigoGray-90 caret-indigoGray-90"
          />

          <div className="z-0">
            <label
              htmlFor="file"
              className="mb-0.5 flex gap-1 font-sans text-sm font-light text-indigoGray-40"
            >
              Resume <span className="text-indigoGray-30">(Required)</span>
            </label>
            <div className="relative flex h-full w-full items-center">
              <input
                id="file"
                className="h-[45px] w-full rounded-lg border border-indigoGray-20 pl-4 font-sans text-sm font-medium text-indigoGray-90 caret-indigoGray-90 hover:border-indigoGray-40 focus:border-indigoGray-50"
              />
              <button className="absolute right-4 text-xs font-medium text-violet-700">
                Upload file
              </button>
            </div>
          </div>

          <div>
            <Input
              id="website"
              label={
                <div className="mb-0.5 flex gap-1 font-sans text-sm font-light">
                  Website <span className="text-indigoGray-30">(Required)</span>
                </div>
              }
              className="h-[45px] w-full rounded-lg !border border-indigoGray-20 pl-4 font-sans text-sm font-medium text-indigoGray-90 caret-indigoGray-90"
            />
            <span className="mb-3 flex flex-row items-center gap-[5px] font-sans text-xs font-normal text-indigoGray-40">
              <SVG src="/icons/alert.svg" height={12} width={12} />
              Own website, Twitter, discord or any other
            </span>
          </div>
        </form>

        <div>
          <h4 className="text-medium font-sans text-sm font-medium text-indigoGray-40">
            Mazury profile
          </h4>
          <div className="my-1 flex flex-row items-center gap-3">
            <Image
              src="/Avatar.png"
              width="40px"
              height="40px"
              alt="user profile avatar"
            />
            <h4 className="text-bold font-serif text-sm font-medium lowercase text-indigoGray-90">
              tranqui
            </h4>
          </div>
          <p className="text-xs font-normal lowercase text-indigoGray-50">
            We will send your Mazury profile along with the application!
          </p>
        </div>

        <div className="my-3 rounded-md bg-indigo-50 py-3 px-3">
          <p className="text-left font-sans text-xs font-medium text-indigo-900">
            It’s rare to have all the stand-out credentials. You can apply
            anyway and if you want us to help with your profile, use talent
            match!
          </p>

          <button className="mb-1 cursor-pointer font-sans text-xs font-semibold text-indigo-600">
            Send us a message
          </button>
        </div>

        <div className="mb-3">
          <label
            htmlFor="message"
            className="mb-0.5 flex gap-1 font-sans text-sm font-medium text-indigoGray-40"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Hi, I wanted to apply because..."
            className="h-[227px] w-full resize-none rounded-lg border border-indigoGray-20 pl-4 pt-[12.75px] font-sans text-sm font-medium text-indigoGray-90 caret-indigoGray-90 hover:border-indigoGray-40 focus:border-indigoGray-50"
          ></textarea>
        </div>

        <Checkbox
          label="Save my data for future applications"
          id="open-to-new-checkbox"
          outerClassName="my-3"
          checked={value}
          setChecked={setValue}
        />

        <button className="mb-[26px] h-[45px] w-full rounded-lg bg-indigoGray-90 font-sans text-sm font-semibold text-indigoGray-5 transition-shadow hover:shadow-lg">
          Send application
        </button>
      </div>
    </main>
  );
};

export default JobApplyModal;
