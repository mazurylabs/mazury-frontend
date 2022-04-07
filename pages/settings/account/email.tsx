import { NextPage } from 'next';
import { Button, Input, SettingsLayout } from 'components';

const EmailPage: NextPage = () => {
  const emailConfirmed = true; //dummy data

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Email</h2>
          </div>

          {emailConfirmed && (
            <div className="mt-8 rounded-md bg-indigoGray-10 p-3">
              <div>
                <h3>Confirmation</h3>

                <p className="my-3">
                  You haven’t confirmed your current address. If you wish to do
                  so, we can resend the link.
                </p>

                <Button className=" uppercase" size="large" variant="secondary">
                  RESEND E-MAIL
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 flex grow flex-col">
            <form className="flex w-full grow flex-col justify-between">
              <div className="grow">
                <Input id="email" placeholder="blob@yahoo.com" label="Email" />
              </div>

              <Button className="w-full uppercase" size="large">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      }
    />
  );
};

export default EmailPage;
