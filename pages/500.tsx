import { useRouter } from 'next/router';

import { Button, Layout } from 'components';

export default function Custom404() {
  const router = useRouter();

  return (
    <Layout variant="plain">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex max-w-[464px] flex-col items-center space-y-[40px]">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="font-demi text-5xl text-indigoGray-90">
              Something went wrong
            </h1>
            <p className="max-w-[70%] text-center font-sans text-indigoGray-90">
              We are sorry, we will make sure that this happens less often.
            </p>
          </div>
          <Button size="large" onClick={() => router.push('/')}>
            Go to home screen
          </Button>
        </div>
      </div>
    </Layout>
  );
}
