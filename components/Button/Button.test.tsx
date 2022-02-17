import { render, screen } from '@testing-library/react';
import { FaSearch } from 'react-icons/fa';
import { Button } from './Button';

describe('Button', () => {
  test('renders a button', () => {
    render(<Button>Button</Button>);
    const btn = screen.getByRole('button', {
      name: 'Button',
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('secondary variant', () => {
    render(<Button variant="primary">Button</Button>);
    const btn = screen.getByRole('button', {
      name: 'Button',
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('tertiary variant', () => {
    render(<Button variant="tertiary">Button</Button>);
    const btn = screen.getByRole('button', {
      name: 'Button',
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('multiple children (SVG icon)', () => {
    render(
      <Button variant="tertiary">
        <FaSearch data-testid="icon" /> <span>Search</span>
      </Button>
    );
    const btn = screen.getByRole('button', {
      name: 'Search',
    });
    const icon = screen.getByTestId('icon');
    expect(btn).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });

  test('disabled state', () => {
    render(<Button disabled>Button</Button>);
    const btn = screen.getByRole('button', {
      name: 'Button',
    });
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  });
});
