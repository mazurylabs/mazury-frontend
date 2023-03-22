import { MobileSidebar } from 'components';
import { NextPage } from 'next';
import { SignIn } from 'views/SignIn';

const SignInPage: NextPage = () => {
  // TODO if the user is logged in, they should be moved to the main page

  return (
    <div className="flex h-screen w-full flex-col pt-16">
      <div className="px-4">
        <SignIn />
      </div>
      <MobileSidebar />
    </div>
  );
};

export default SignInPage;
