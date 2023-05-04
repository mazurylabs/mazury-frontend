import { OpportunityType } from 'types';
import clsx from 'clsx';

interface ButtonProps {
  category: string;
  categoryName: string;
  opportunity?: OpportunityType<string>;
  onChange: (opportunity: Partial<OpportunityType<string>>) => void;
}

export const OpportunityCategoryButton: React.FC<ButtonProps> = ({
  category,
  categoryName,
  opportunity,
  onChange,
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'font-sans w-full grow py-3 rounded-md text-indigoGray-50 text-xs font-medium',
        opportunity?.job_category === category
          ? 'border-[1.5px] border-indigo-600 bg-indigo-50'
          : 'border border-indigoGray-20'
      )}
      onClick={() => onChange({ job_category: category })}
    >
      {categoryName}
    </button>
  );
};
