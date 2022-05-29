interface ReferralFilterProps {
  handleSelect: (filter: string) => void;
}

export const ReferralFilter = ({}: ReferralFilterProps) => {
  return (
    <div className="h-full w-full rounded-3xl shadow-base">
      <p>Hello Referral Filter</p>
    </div>
  );
};
