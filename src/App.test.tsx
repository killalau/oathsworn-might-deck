import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppStateProvider } from './data/AppState';

test('renders deck toggle', () => {
  render(
    <AppStateProvider>
      <App />
    </AppStateProvider>,
  );
  const el = screen.getByText(/Encounter Deck/i);
  expect(el).toBeInTheDocument();
});
