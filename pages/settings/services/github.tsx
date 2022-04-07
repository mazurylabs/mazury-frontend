import { NextPage } from 'next';
import { Button, SettingsLayout } from 'components';

const GithubPage: NextPage = () => {
  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Github</h2>
          </div>

          <div className="mt-3 flex grow flex-col">
            <div className="flex grow flex-col justify-between">
              <div className="grow">
                <div>
                  <p className="font-inter text-sm font-medium leading-[18px] text-indigoGray-60">
                    You can connect your Twitter account and have it show up as
                    one of your contacts. This way someone can reach you faster.
                  </p>
                </div>
              </div>

              <Button className="w-full uppercase" size="large">
                CONNECT TWITTER
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default GithubPage;
