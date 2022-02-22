import { fireEvent, render, screen } from '@testing-library/react';
import { colors } from 'utils';
import { TagItem } from '.';

describe('TagItem', () => {
  test('renders correctly and fires onRemove as intended', () => {
    const onRemove = jest.fn();
    render(
      <TagItem
        color={colors.indigo}
        label="Frontend engineer"
        showRemove
        onRemove={onRemove}
        value="frontend"
      />
    );
    const container = screen.getByRole('tag');
    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent('Frontend engineer');
    expect(container).toMatchSnapshot();
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
