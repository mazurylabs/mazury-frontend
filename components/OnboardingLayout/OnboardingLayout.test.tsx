import { render, screen } from '@testing-library/react';
import { OnboardingLayout } from './OnboardingLayout';
import * as wagmi from 'wagmi';

describe('OnboardingLaout', () => {
  test('all sections are being rendered', () => {
    const spyUseConnect = jest.spyOn(wagmi, 'useConnect');
    spyUseConnect.mockReturnValue([
      {
        // @ts-ignore we are not returning all the fields returned by the actual data field. We don't need to
        data: {
          connected: true,
        },
        loading: false,
      },
    ]);

    const spyUseAccount = jest.spyOn(wagmi, 'useAccount');
    spyUseAccount.mockReturnValue([
      {
        // @ts-ignore we are not returning all the fields returned by the actual data field. We don't need to
        data: {
          address: '0x123',
        },
        loading: false,
      },
    ]);
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

  test('wallet not connected', () => {
    const spyUseConnect = jest.spyOn(wagmi, 'useConnect');
    spyUseConnect.mockReturnValue([
      {
        // @ts-ignore we are not returning all the fields returned by the actual data field. We don't need to
        data: {
          connected: false,
        },
        loading: false,
      },
    ]);

    const spyUseAccount = jest.spyOn(wagmi, 'useAccount');
    spyUseAccount.mockReturnValue([
      {
        // @ts-ignore we are not returning all the fields returned by the actual data field. We don't need to
        data: {},
        loading: false,
      },
    ]);
    render(
      <OnboardingLayout
        firstHeading="First heading"
        secondHeading="Second heading"
        bottomButtonText="Bottom content"
      >
        <p>Content</p>
      </OnboardingLayout>
    );
    const infoPrompt = screen.getByText('Please connect your wallet first');
    expect(infoPrompt).toBeInTheDocument();
  });
});
