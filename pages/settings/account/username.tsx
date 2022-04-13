import { NextPage } from 'next';
import { Button, Input, SettingsLayout } from 'components';

const UsernamePage: NextPage = () => {
  const suggestions = ['blob.eth', 'second.eth', 'third.eth']; //dummy suggestions

  return (
    <SettingsLayout
      content={
        <div>
          <div className="font-serif text-4xl font-semibold leading-9">
            <h2>Username</h2>
          </div>

          <div className="mt-4 lg:mt-6">
            <form>
              <div>
                <Input
                  id="username"
                  label="Username"
                  value={''}
                  placeholder="Insert username"
                  onChange={() => {}}
                />
                <div className="mt-2 flex">
                  {suggestions.map((suggestion, index) => (
                    <span
                      className="mr-2 flex max-w-[6.0625rem] grow justify-center rounded-lg border border-indigoGray-90 py-2"
                      key={suggestion + index}
                    >
                      {suggestion}
                    </span>
                  ))}
                </div>
              </div>

              <Input
                id="full-name"
                outerClassName="mt-8 mb-8"
                placeholder="Insert full name"
                label={
                  <>
                    Full name{' '}
                    <span className="text-indigoGray-20">(optional)</span>
                  </>
                }
              />

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

export default UsernamePage;
