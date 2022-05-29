interface ReferralFilterProps {
  handleSelect: (filter: string) => void;
}

export const ReferralFilter = ({}: ReferralFilterProps) => {
  return (
    <div className="h-full w-full">
      <p>Hello Referral Filter</p>
    </div>
  );
};
