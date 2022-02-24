const Page = () => {
  return (
    <button
      onClick={() => {
        throw new Error('something broke');
      }}
    >
      Error
    </button>
  );
};

export default Page;
