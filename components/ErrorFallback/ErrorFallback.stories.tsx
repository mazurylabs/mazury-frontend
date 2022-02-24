import { ComponentMeta } from '@storybook/react';
import { ErrorFallback } from './ErrorFallback';

export default {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  argTypes: {},
} as ComponentMeta<typeof ErrorFallback>;

export const Default = () => {
  return <ErrorFallback />;
};
