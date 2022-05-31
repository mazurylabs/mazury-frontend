import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Checkbox } from '.';

const WrappedCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      setChecked={setChecked}
      label="Label"
      id="checkbox-1"
    />
  );
};

describe('Checkbox', () => {
  test('renders and behaves correctly', () => {
    render(<WrappedCheckbox />);
    const outerContainer = screen.getByTestId('checkbox-outer-container');
    expect(outerContainer).toMatchSnapshot();
    const hiddenCheckbox = screen.getByTestId(
      'Hidden Checkbox'
    ) as HTMLInputElement;
    expect(hiddenCheckbox.checked).toBe(false);
    expect(hiddenCheckbox).toBeInTheDocument();
  });
});
