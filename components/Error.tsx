import { Button } from './Button';
import { Layout } from './Layout/Layout';

interface Props {
  title: string;
  description: string;
}

export const Error: React.FC<Props> = ({ title, description }) => {
  const handleReset = () => window.location.assign(window.location.origin);

  return (
    <Layout variant="plain">
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex max-w-[464px] flex-col items-center space-y-[40px]">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="font-demi text-5xl text-indigoGray-90">{title}</h1>
            <p className="max-w-[70%] text-center font-sans text-indigoGray-90">
              {description}
            </p>
          </div>
          <Button size="large" onClick={handleReset}>
            Go to home screen
          </Button>
        </div>
      </div>
    </Layout>
  );
};
