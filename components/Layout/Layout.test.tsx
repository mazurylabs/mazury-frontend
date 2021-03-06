import { render, screen } from '@testing-library/react';
import { Sidebar } from 'components';
import { Layout } from './Layout';
import * as nextRouter from 'next/router';
import * as wagmi from 'wagmi';

describe('Layout', () => {
  test('all parts are being rendered correctly', () => {
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
    const mockRouter = jest.spyOn(nextRouter, 'useRouter');
    // @ts-ignore we are not mocking the entire router, just pathname
    mockRouter.mockReturnValue({
      pathname: '/',
    });
    render(
      <Layout
        sidebarContent={<menu>Sidebar</menu>}
        innerLeftContent={<span>Inner left content</span>}
        innerRightContent={<span>Inner right content</span>}
        headerContent={<span>Header content</span>}
      />
    );
    const sidebar = screen.getByRole('menu');
    expect(sidebar).toBeInTheDocument();
    const innerLeft = screen.getByText('Inner left content');
    expect(innerLeft).toBeInTheDocument();
    const innerRight = screen.getByText('Inner right content');
    expect(innerRight).toBeInTheDocument();
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    const layoutContainer = screen.getByTestId('layout-container');
    expect(layoutContainer).toBeInTheDocument();
    expect(layoutContainer).toMatchSnapshot();
  });
});
