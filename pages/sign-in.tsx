import { MobileSidebar } from 'components';
import { NextPage } from 'next';
import { SignIn } from 'views/SignIn';

const SignInPage: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col px-4 pt-16">
      <SignIn />
      <MobileSidebar />
    </div>
  );
};

export default SignInPage;
