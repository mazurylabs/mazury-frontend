interface RoleFilterProps {
  handleSelect: (filter: string) => void;
}

export const RoleFilter = ({}: RoleFilterProps) => {
  return (
    <div className="h-full w-full">
      <p>Hello Role Filter</p>
    </div>
  );
};
