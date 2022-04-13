import { render } from '@testing-library/react';
import { MobileSidebar } from './MobileSidebar';
import * as wagmi from 'wagmi';

test('MobileSidebar', () => {
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
  render(<MobileSidebar />);
  expect(MobileSidebar).toMatchSnapshot();
});
