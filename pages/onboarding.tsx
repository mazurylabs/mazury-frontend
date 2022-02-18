import { Button, Input } from 'components';
import { NextPage } from 'next';
import Image from 'next/image';

const OnboardingPage: NextPage = () => {
  return (
    <main className="min-h-screen px-4 py-4">
      <Image src="/icons/back.svg" alt="Back" width="16px" height="16px" />

      <h1 className="mt-6 text-sm font-medium uppercase text-indigoGray-40">
        Profile information
      </h1>
      <h3 className="mt-2 font-demi text-4xl text-indigoGray-90">
        Hi, wojtek.eth!
      </h3>
      <p className="mt-3 text-sm font-medium text-indigoGray-60">
        We&apos;re glad you&apos;re joining us. Let&apos;s take a moment to
        polish your profile a bit!
      </p>

      <div className="flex">
        <div className="mt-6 flex w-3/4 flex-col">
          <span className="text-sm font-medium uppercase text-black-300">
            ENS Name
          </span>
          <span className="text-black mt-1 text-lg font-medium">
            wojtek.eth
          </span>
          {/* TODO: Fix overflowing text */}
          <span className="mt-1 text-xs font-medium text-black-700">
            0xF417ACe7b13c0ef4fcb55483 90a450A4B75D3eB3
          </span>
        </div>

        <div className="mr-6 flex w-1/4 items-center justify-end">
          <Image
            src="/icons/refresh.svg"
            height="24px"
            width="24px"
            alt="Refresh ENS"
          />
        </div>
      </div>

      <form className="mt-4 flex flex-col">
        <Input id="username" label="Username" />
        <Input
          id="full-name"
          marginTop={4}
          label={
            <>
              Full name <span className="text-indigoGray-20">(optional)</span>
            </>
          }
        />

        <div className="mt-6 flex items-center justify-center gap-6 p-4">
          <Image
            src="/default-avi.png"
            height="100px"
            width="100px"
            alt="Your profile picture"
            className="rounded-full border-[1.5px] border-indigoGray-30"
          />

          <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" className="uppercase">
              Add picture
            </Button>
            <Button variant="tertiary" className="uppercase">
              Remove picture
            </Button>
          </div>
        </div>

        {/* TODO: Make this button sticky */}
        <Button className="mt-20 w-full justify-center uppercase" disabled>
          Continue
        </Button>
      </form>
    </main>
  );
};

export default OnboardingPage;
