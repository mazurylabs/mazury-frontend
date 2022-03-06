import { getByTestId, render, screen } from '@testing-library/react';
import { RoleCard } from '.';

describe('RoleCard', () => {
  test('displays information correctly and reacts correctly on click', () => {
    render(
      <div data-testid="container">
        <RoleCard
          role="role_developer"
          iconSrc="/icons/developer.svg"
          coloredSrc="/icons/roles/colored/developer.svg"
        />
      </div>
    );
    const label = screen.getByText('Developer');
    const icon = screen.getByAltText('Role icon');
    expect(label).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(screen.getByTestId('container')).toMatchSnapshot();
  });
});
