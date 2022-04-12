import { fireEvent, render, screen } from '@testing-library/react';
import { FaTwitter } from 'react-icons/fa';
import { SocialButton } from './SocialButton';

describe('SocialButton', () => {
  test('primary variant', () => {
    const onClick = jest.fn();
    render(
      <SocialButton
        icon={<FaTwitter />}
        label="Twitter"
        backgroundColor="#4A99E9"
        onClick={onClick}
      />
    );
    const button = screen.getByRole('button', {
      name: 'Twitter',
    });
    expect(button).toMatchSnapshot();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('secondary variant', () => {
    const onClick = jest.fn();
    render(
      <SocialButton
        icon={<FaTwitter />}
        label="Twitter"
        backgroundColor="#4A99E9"
        onClick={onClick}
        variant="secondary"
      />
    );
    const button = screen.getByRole('button', {
      name: 'Twitter',
    });
    expect(button).toMatchSnapshot();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
