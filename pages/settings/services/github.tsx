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
            <div className="flex grow flex-col">
              <div className="grow md:mb-8 md:grow-0">
                <div>
                  <p className="font-inter text-sm font-medium leading-[18px] text-indigoGray-60">
                    You can connect your Github account and have it show up as
                    one of your contacts. This way someone can see more info
                    about your projects.
                  </p>
                </div>
              </div>

              <Button className="w-full uppercase" size="large">
                CONNECT GITHUB
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default GithubPage;
