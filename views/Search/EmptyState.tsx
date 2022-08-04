import SVG from 'react-inlinesvg';

import { useProfileSuggestions } from 'hooks';

import { Talent } from './Talent';
import { useSelector } from 'react-redux';
import { userSlice } from '@/selectors';

export const EmptyState = () => {
  const { address } = useSelector(userSlice);
  const { profiles } = useProfileSuggestions(address as string, {
    isNetwork: true,
    limit: 3,
  });

  return (
    <div className="font-inter mt-3 flex grow flex-col pb-6 text-sm font-medium text-indigoGray-90">
      <div className="flex grow flex-col items-center justify-between pt-[80px] pb-8">
        <div className="space-y-[2px] text-center">
          <h3 className="indigoGray-80 font-sans text-lg font-bold leading-[27px]">
            Let’s try again
          </h3>
          <p>
            We found no perfect matches, you can try <br /> with a different
            keyword
          </p>
        </div>

        <div className="flex flex-col items-center space-y-[10px]">
          <p className="font-inter text-base font-bold leading-6 text-pink-600">
            or explore our spotlight!
          </p>

          <SVG src="/icons/spotlight-arrow.svg" height={58} width={85} />
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div>
          <h4 className="font-serif text-xl font-bold leading-6 text-pink-600">
            Mazury Spotlight
          </h4>
        </div>
        <div>
          <Talent result={profiles} />
        </div>
      </div>
    </div>
  );
};
