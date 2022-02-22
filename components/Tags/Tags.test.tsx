import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { colors } from 'utils';
import { Tags } from './Tags';

const TagsContainer = () => {
  const [tags, setTags] = useState([
    {
      label: 'Frontend development',
      color: colors.indigo,
      value: 'frontend',
    },
    {
      label: 'Solidity',
      color: colors.amber,
      value: 'solidity',
    },
    {
      label: 'Community',
      color: colors.emerald,
      value: 'community',
    },
  ]);

  const onRemove = (val: string) => {
    const newTags = tags.filter((tag) => tag.value !== val);
    setTags(newTags);
  };

  return <Tags tags={tags} onRemove={onRemove} />;
};

describe('Tags', () => {
  test('renders correctly, onRemove works correctly', () => {
    render(<TagsContainer />);
    const container = screen.getByRole('tags');
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    const frontendTag = screen.getByText('Frontend development');
    const removeFrontendButton = screen.getByLabelText(
      'Remove Frontend development'
    );
    fireEvent.click(removeFrontendButton);
    expect(frontendTag).not.toBeInTheDocument();
  });
});
