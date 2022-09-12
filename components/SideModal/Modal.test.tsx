import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { SideModal } from './SideModal';

const ModalContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="root-el">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <SideModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appRootId="root-el"
      >
        <h1>Modal</h1>
      </SideModal>
    </div>
  );
};

describe('Modal', () => {
  it('renders correctly and close functionality works properly', () => {
    render(<ModalContainer />);
    const toggleButton = screen.getByRole('button', { name: 'Open Modal' });
    fireEvent.click(toggleButton);
    const content = screen.getByText('Modal');
    const container = document.getElementsByClassName('ReactModalPortal')[0];
    expect(content).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    const overlay = document.getElementsByClassName('ReactModal__Overlay')[0];
    fireEvent.click(overlay);
    expect(content).not.toBeInTheDocument();
  });
});
