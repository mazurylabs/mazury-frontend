import { Error } from 'components';

export default function Custom404() {
  return (
    <Error
      title="Something went wrong"
      description="We are sorry, we will make sure that this happens less often."
    />
  );
}
