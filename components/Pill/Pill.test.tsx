import { render, screen } from '@testing-library/react';
import { Pill } from 'components';

describe('Pill', () => {
  test('inactive state', () => {
    render(<Pill label="Label" />);
    const pill = screen.getByRole('button', {
      name: 'Label'.toUpperCase(),
    });
    expect(pill).toBeInTheDocument();
    expect(pill).toMatchSnapshot();
  });

  test('active state', () => {
    render(<Pill label="Label" active />);
    const pill = screen.getByRole('button', {
      name: 'Label'.toUpperCase(),
    });
    expect(pill).toBeInTheDocument();
    expect(pill).toMatchSnapshot();
  });
});
