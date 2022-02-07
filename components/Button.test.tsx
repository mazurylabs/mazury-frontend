import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole('button', {
      name: 'Button',
    });

    expect(button).toBeInTheDocument();
  });
});
