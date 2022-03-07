import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  test('input with label and placeholder', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <Input id="input-1" placeholder="Placeholder" label="Label" />
    );
    expect(getByLabelText('Label')).toBeInTheDocument();
    expect(getByPlaceholderText('Placeholder')).toBeInTheDocument();
    expect(getByLabelText('Label')).toMatchSnapshot();
  });

  test('disabled', () => {
    const { getByPlaceholderText } = render(
      <Input id="input-1" placeholder="Placeholder" label="Label" disabled />
    );
    const input = getByPlaceholderText('Placeholder');
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(input).toMatchSnapshot();
  });

  test('error', () => {
    const { getByPlaceholderText } = render(
      <Input id="input-1" placeholder="Placeholder" label="Label" error />
    );
    const input = getByPlaceholderText('Placeholder');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-red-500');
    expect(input).toMatchSnapshot();
  });
});
