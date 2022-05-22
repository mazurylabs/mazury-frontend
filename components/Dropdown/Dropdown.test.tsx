import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const DropdownContent = () => {
  return <div>Content</div>;
};

const DropdownContainer = () => {
  return (
    <Dropdown label="Dropdown label">
      <DropdownContent />
    </Dropdown>
  );
};

test('Dropdown', () => {
  render(<DropdownContainer />);
  const { getByRole, getByTestId } = screen;
  const dropdown = getByRole('dropdown');
  expect(dropdown).toBeInTheDocument();
  fireEvent.click(dropdown);
  const dropdownContent = getByTestId('dropdown-options');
  expect(dropdownContent).toBeInTheDocument();
  expect(dropdown).toMatchSnapshot();
});
