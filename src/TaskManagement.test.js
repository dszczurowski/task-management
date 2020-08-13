import React from 'react';
import { render } from '@testing-library/react';
import TaskManagement from './TaskManagement';

test('renders properly', () => {
  const RootComponent = render(<TaskManagement />);
  expect(RootComponent).exists();
});
