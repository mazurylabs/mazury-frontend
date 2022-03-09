import { render, screen } from '@testing-library/react';
import { Sidebar } from 'components';
import { Layout } from './Layout';
import * as nextRouter from 'next/router';

describe('Layout', () => {
  test('all parts are being rendered correctly', () => {
    const mockRouter = jest.spyOn(nextRouter, 'useRouter');
    // @ts-ignore we are not mocking the entire router, just pathname
    mockRouter.mockReturnValue({
      pathname: '/',
    });
    render(
      <Layout
        sidebarContent={<Sidebar />}
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
