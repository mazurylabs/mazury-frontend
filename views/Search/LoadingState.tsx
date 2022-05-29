export const LoadingState = () => {
  return (
    <div className="mt-1 w-[60%]">
      <div className="animate-pulse">
        <div className="h-5 w-full rounded bg-indigoGray-20" />

        <div className="flex-1 space-y-3 py-10">
          <div className="space-y-1">
            <div className="h-5 w-[40%] rounded bg-indigoGray-20" />
            <div className="h-5 w-[70%] rounded bg-indigoGray-20" />
            <div className="h-5 w-full rounded bg-indigoGray-20" />
          </div>

          <div className="space-y-1">
            <div className="h-5 w-[70%] rounded bg-indigoGray-20" />
            <div className="h-5 w-full rounded bg-indigoGray-20" />
          </div>

          <div className="space-y-1">
            <div className="h-5 w-[70%] rounded bg-indigoGray-20" />
            <div className="h-5 w-full rounded bg-indigoGray-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
