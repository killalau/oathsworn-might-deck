import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders deck toggle', () => {
  render(<App />);
  const el = screen.getByText(/Encounter Deck/i);
  expect(el).toBeInTheDocument();
});
