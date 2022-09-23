import { NextPage } from 'next';
import { Button, SettingsLayout } from 'components';
import { useProtectedRoute } from 'hooks';

const DiscordPage: NextPage = () => {
  useProtectedRoute();

  return (
    <SettingsLayout
      content={
        <div className="flex grow flex-col">
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Discord</h2>
          </div>

          <div className="mt-3 flex grow flex-col">
            <div className="flex grow flex-col">
              <div className="grow md:mb-8 md:grow-0">
                <div>
                  <p className="font-sans text-sm font-medium leading-[18px] text-indigoGray-60">
                    You can connect your Discord account and have it show up as
                    one of your contacts. This way someone can reach you faster.
                  </p>
                </div>
              </div>

              <Button className="w-full uppercase" size="large" disabled={true}>
                CONNECT DISCORD (COMING SOON)
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default DiscordPage;
