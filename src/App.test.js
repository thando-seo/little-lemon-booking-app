import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the welcome heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /welcome to little lemon/i });
  expect(heading).toBeInTheDocument();
});
