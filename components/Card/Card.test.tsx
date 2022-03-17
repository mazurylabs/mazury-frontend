import { render, screen } from '@testing-library/react';
import { Card } from '.';

test('Card', () => {
  render(<Card>Card content</Card>);
  const cardContainer = screen.getByText('Card content');
  expect(cardContainer).toBeInTheDocument();
  expect(cardContainer).toMatchSnapshot();
});
