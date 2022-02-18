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
});
