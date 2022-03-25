import { render } from '@testing-library/react';
import { MobileSidebar } from './MobileSidebar';

test('MobileSidebar', () => {
  render(<MobileSidebar />);
  expect(MobileSidebar).toMatchSnapshot();
});
