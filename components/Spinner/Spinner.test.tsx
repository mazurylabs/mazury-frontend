import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

test('Spinner', () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});
