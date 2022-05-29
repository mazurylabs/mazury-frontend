interface SkillFilterProps {
  handleSelect: (filter: string) => void;
}

export const SkillFilter = ({}: SkillFilterProps) => {
  return (
    <div className="h-full w-full rounded-3xl shadow-base">
      <p>Hello Skill Filter</p>
    </div>
  );
};
