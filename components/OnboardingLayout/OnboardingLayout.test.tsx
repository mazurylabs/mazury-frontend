import { render, screen } from '@testing-library/react';
import { OnboardingLayout } from './OnboardingLayout';

describe('OnboardingLaout', () => {
  test('all sections are being rendered', () => {
    render(
      <OnboardingLayout
        firstHeading="First heading"
        secondHeading="Second heading"
        bottomButtonText="Bottom content"
      >
        <p>Content</p>
      </OnboardingLayout>
    );
    expect(screen.getByText('First heading')).toBeInTheDocument();
    expect(screen.getByText('Second heading')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    const btn = screen.getByRole('button', {
      name: 'Bottom content',
    });
    expect(btn).toBeInTheDocument();
    const mainContainer = screen.getByRole('main');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toMatchSnapshot();
  });
});
