import { Layout } from 'components';
import { NextPage } from 'next';
import { SignIn } from 'views/SignIn';

const SignInPage: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col px-48 pt-12">
      <SignIn />
    </div>
  );
};

export default SignInPage;
