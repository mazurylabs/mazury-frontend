import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import SVG from 'react-inlinesvg';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  width?: number;
  align?: 'center' | 'left' | 'right';
  withSorting?: boolean;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  rows?: Entry[];
  columns: TableColumn<Entry>[];
  emptyState: {
    description: string;
    link?: {
      label: string;
      url: string;
    };
  };
  isLoading: boolean;
};

const getColumnDimension = <Entry extends any>(
  columns: TableColumn<Entry>[]
) => {
  const availableColumnWidth = columns.reduce((prev, next) => {
    return prev + (next?.width || 0);
  }, 0);

  const remainingItems = columns.filter((column) => !column.width).length;

  return (100 - availableColumnWidth) / remainingItems;
};

export const Table = <Entry extends { eth_address: string }>({
  rows,
  columns,
  emptyState,
  isLoading,
}: TableProps<Entry>) => {
  const columnDimension = getColumnDimension<{ width?: number } & any>(columns);
  const skeletonArray = new Array(4).fill(true);

  if (!rows?.length) {
    return (
      <div
        className={clsx(
          'overflow-y-auto',
          !isLoading && 'grow flex flex-col xl:space-y-[128px] h-full'
        )}
      >
        <div className="flex rounded-md min-w-[1200px] shrink-0">
          {columns.map((column, index) => (
            <div
              key={column.title}
              className="grow"
              style={{
                textAlign: column.align || 'left',
                width: column.width
                  ? `${column.width}%`
                  : `${columnDimension}%`,
              }}
            >
              <div
                className={clsx(
                  'w-full flex space-x-3 items-center grow py-2 px-4 bg-indigoGray-5',
                  index === columns.length - 1 && 'justify-end'
                )}
              >
                {!index && (
                  <div className="h-4 w-4 border border-indigoGray-30 rounded" />
                )}
                <p className="font-sans font-medium text-xs text-indigoGray-50">
                  {column.title}
                  {column.withSorting && (
                    <SVG
                      className="ml-1 inline-block"
                      src="/icons/polygon.svg"
                    />
                  )}
                </p>
              </div>

              {isLoading &&
                skeletonArray.map((_, skeletonIndex) => (
                  <div
                    className={clsx(
                      'mt-4 flex',
                      column.align ? 'justify-end' : 'justify-start'
                    )}
                    key={`table-skeleton-${skeletonIndex}`}
                  >
                    {!index ? (
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 animate-pulse rounded-full bg-indigoGray-30" />
                        <div className="h-3 w-[147px] animate-pulse rounded-2xl bg-indigoGray-30" />
                      </div>
                    ) : index === columns.length - 1 ? (
                      <div className="w-[44px] h-9 rounded-[32px] animate-pulse rounded-2xl bg-indigoGray-30" />
                    ) : (
                      <div className="h-10 w-full flex items-center">
                        <div className="h-3 w-[60%] animate-pulse rounded-2xl bg-indigoGray-30" />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {!isLoading && (
          <div className="flex flex-col items-center space-y-4 grow justify-center xl:justify-start">
            <SVG src="/icons/no-credentials.svg" width={227} height={70} />
            <p className="font-sans text-sm text-indigoGray-90">
              {emptyState.description}
            </p>
            {emptyState.link && (
              <Link
                className="font-semibold font-sans text-indigo-600 text-xs"
                href={emptyState.link.url}
              >
                {emptyState.link.label}
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="h-full min-w-full overflow-y-auto">
        <div className="h-2" />
        <thead className="rounded-md bg-indigoGray-5">
          <tr className="first:rounded-l-md first:rounded-t-md last:rounded-r-md last:rounded-b-md">
            {columns.map((column, index) => (
              <th
                key={column.title + index}
                scope="col"
                className="whitespace-nowrap px-4 py-2 text-xs font-medium text-indigoGray-50 first:rounded-l-md first:rounded-t-md last:rounded-r-md last:rounded-b-md"
                style={{
                  textAlign: column.align || 'left',
                  width: column.width
                    ? `${column.width}%`
                    : `${columnDimension}%`,
                }}
              >
                {column.title}{' '}
                {column.withSorting && (
                  <SVG className="ml-1 inline-block" src="/icons/polygon.svg" />
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="mt-2">
          {rows.map((entry, entryIndex) => (
            <tr
              key={entry?.eth_address || entryIndex}
              className="first:rounded-l-lg first:rounded-t-lg last:rounded-r-lg last:rounded-b-lg hover:bg-indigoGray-5"
            >
              {columns.map(({ Cell, field, title }, columnIndex) => (
                <td
                  key={title + columnIndex}
                  className={clsx(
                    'whitespace-nowrap px-4 py-[9.5px] text-sm text-indigoGray-90 first:rounded-l-lg first:rounded-t-lg last:rounded-r-lg last:rounded-b-lg',
                    columnIndex === columns.length - 1 && 'text-right'
                  )}
                >
                  {Cell ? <Cell entry={entry} /> : entry[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
