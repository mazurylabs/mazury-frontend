import { Toggle } from './Toggle';
import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

const WrappedToggle = () => {
  const [isToggled, setToggled] = useState(false);

  return (
    <Toggle
      isToggled={isToggled}
      onToggle={() => setToggled((isToggled) => !isToggled)}
    />
  );
};

test('Toggle', () => {
  render(<WrappedToggle />);
  const outerContainer = screen.getByTestId('toggle-outer-container');
  expect(outerContainer).toBeInTheDocument();
  expect(outerContainer).toMatchSnapshot();
  const hiddenCheckbox = screen.getByTestId(
    'Hidden Checkbox'
  ) as HTMLInputElement;
  expect(hiddenCheckbox).toBeInTheDocument();
  expect(hiddenCheckbox).not.toBeChecked();
});
