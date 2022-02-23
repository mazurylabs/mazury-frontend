import { render, screen } from '@testing-library/react';
// TODO: Mock the router and test with the actual sidebar
// import { Sidebar } from 'components';
import { Layout } from './Layout';

describe('Layout', () => {
  test('all parts are being rendered correctly', () => {
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
