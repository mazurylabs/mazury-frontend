import { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <div className="flex flex-col gap-12 p-6 text-4xl">
      <h3 className="font-black">Black</h3>
      <h3 className="font-extrabold">Extrabold</h3>
      <h3 className="font-bold">Bold</h3>
      <h3 className="font-semibold">Semibold</h3>
      <h3 className="font-regular">Regular</h3>
    </div>
  );
};

export default Page;
