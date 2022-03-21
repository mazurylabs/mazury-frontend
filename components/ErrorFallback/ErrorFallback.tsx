export const ErrorFallback = () => {
  return (
    <div
      role="alert"
      className="min-h-screen rounded bg-red-50 p-4 text-center shadow md:p-8 lg:p-16"
    >
      <h1 className="font-serif text-4xl text-indigoGray-90">
        Something went wrong :(
      </h1>
      <p className="text-indigoGray-40">
Please try refreshing the page or contact us at{' '}
        <a
          href="https://twitter.com/mazuryxyz"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          @mazuryxyz on Twitter
        </a>{' '}
        if the problem persists.
      </p>
    </div>
  );
};
