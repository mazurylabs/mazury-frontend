import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

export const Notes = ({ comments }: { comments: string }) => {
  const [note, setNote] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild className="relative">
        <button
          type="button"
          aria-label="comments"
          className="data-[state=open]:bg-indigo-600 data-[state=open]:text-indigo-50 data-[state=open]:before:bg-indigo-50 ml-[auto] flex h-9 w-[44px] items-center justify-center rounded-[32px] border border-indigoGray-20 bg-indigoGray-5 text-indigoGray-40 before:absolute before:z-[-1] before:h-[42px] before:w-[52px] before:rounded-[32px] before:bg-transparent before:content-['*'] hover:bg-indigoGray-10"
        >
          <SVG src="/icons/message-square.svg" className="mr-1" />
          {comments}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          alignOffset={-15}
          sideOffset={0}
          className="h-[272px] w-[calc(100vw-32px)] sm:w-[calc(100vw-64px)] lg:h-[212px] lg:w-[352px]"
        >
          <div className="flex h-full w-full flex-col rounded-lg bg-white shadow-base">
            <div className="px-4">
              <div className="flex justify-end pt-4">
                <Popover.Close aria-label="Close">
                  <SVG src="/icons/x.svg" className="h-4 w-4" />
                </Popover.Close>
              </div>
              <p className="font-sans text-base font-medium text-indigoGray-90">
                Notes
              </p>
            </div>

            <div className="mt-4 h-[110px] space-y-2 overflow-y-auto pl-4 pb-2">
              {true ? (
                <div className="border-l border-l-indigoGray-20 pl-3">
                  <div>
                    <p className="font-sans text-xs font-medium text-indigoGray-40">
                      May 12 2023
                    </p>
                  </div>
                  <p className="font-sans text-sm text-indigoGray-90">
                    They are open to relocation
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-6 border-l border-l-indigoGray-20 pl-3">
                  <p className="font-sans text-sm text-indigoGray-50">
                    Comment deleted
                  </p>
                  <button
                    type="button"
                    className="font-sans text-sm font-medium text-indigo-500"
                  >
                    Undo
                  </button>
                </div>
              )}
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-[auto] flex h-[46px] w-full items-center justify-between bg-indigoGray-5 px-4"
            >
              <textarea
                onChange={handleChange}
                value={note}
                placeholder="Write a note…"
                className="mr-4 h-full grow resize-none bg-transparent py-3 font-sans text-sm text-indigoGray-90"
              />
              <button
                type="submit"
                disabled={!note}
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full',
                  note ? 'bg-indigoGray-90' : 'bg-indigoGray-30'
                )}
              >
                <SVG src="/icons/arrow-up.svg" />
              </button>
            </form>
          </div>
          <Popover.Arrow fill="white" className="drop-shadow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
