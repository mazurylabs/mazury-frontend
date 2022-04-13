import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useSWRConfig } from 'swr';
import { useAccount, useSignMessage } from 'wagmi';
import { Button, Input, SettingsLayout } from 'components';
import { useProfile } from 'hooks';
import { getMessageToBeSigned, updateProfile } from 'utils/api';

const EmailPage: NextPage = () => {
  const { mutate } = useSWRConfig();
  const [email, setEmail] = useState('');
  const [_, signMessage] = useSignMessage();
  const [{ data: accountData }] = useAccount();
  const { profile } = useProfile(accountData?.address as string);

  //Prefill form with exisiting email
  useEffect(() => {
    setEmail(profile?.email || '');
  }, [profile]);

  const emailConfirmed = true; //dummy data

  const onEmailChange = (value: string) => setEmail(value);

  const onSubmit = async () => {
    if (!accountData?.address) {
      return alert('Please connect your wallet first');
    }

    const { data: messageToBeSigned, error: messageSignError } =
      await getMessageToBeSigned(accountData?.address);

    if (!messageToBeSigned || messageSignError) {
      return alert(
        'Couldnt get the message to be signed. Please try again later.'
      );
    }

    const { data: signature, error: signatureError } = await signMessage({
      message: messageToBeSigned,
    });

    if (!signature || signatureError) {
      return alert('Error signing message');
    }

    const formData = {
      email,
    };

    const { error: updateProfileError, data } = await updateProfile(
      accountData?.address,
      signature,
      formData
    );

    mutate(`/profile/${accountData?.address}`);
    setEmail(data.email); //optimistic update for the input field

    if (updateProfileError) {
      return alert('Error updating profile.');
    }
  };

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
                <h3 className="font-bold">Confirmation</h3>

                <p className="my-3">
                  You haven’t confirmed your current address. If you wish to do
                  so, we can resend the link.
                </p>

                <Button
                  className="bg-transparent text-lg uppercase"
                  size="large"
                  variant="secondary"
                >
                  RESEND E-MAIL
                </Button>
              </div>
            </div>
          )}

          <div className="mt-8 flex grow flex-col">
            <form className="flex w-full grow flex-col justify-between">
              <div className="grow md:mb-8 md:grow-0">
                <Input
                  id="email"
                  placeholder="Insert e-mail"
                  label="Email"
                  value={email}
                  onChange={onEmailChange}
                />
              </div>

              <Button
                className="w-full uppercase"
                size="large"
                onClick={onSubmit}
              >
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
