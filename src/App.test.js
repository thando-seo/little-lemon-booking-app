import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders homepage sections inside one main landmark', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getAllByRole('main')).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1, name: 'Little Lemon' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /this week’s specials/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /what our customers say/i })).toBeInTheDocument();
  expect(screen.getAllByRole('article')).toHaveLength(6);
});

test('navigation links point to the six routes', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  const nav = within(screen.getByRole('navigation', { name: 'Primary navigation' }));
  const destinations = { Home: '/', About: '/about', Menu: '/menu', Reservations: '/booking', 'Order Online': '/order-online', Login: '/login' };
  Object.entries(destinations).forEach(([name, path]) => {
    expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('href', path);
  });
});

test('reservation call to action opens the booking page', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  userEvent.click(screen.getByRole('link', { name: 'Reserve a Table' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Reserve a Table' })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /this week’s specials/i })).not.toBeInTheDocument();
});

test.each([
  ['/about', 'About Little Lemon'],
  ['/menu', 'Our Menu'],
  ['/booking', 'Reserve a Table'],
  ['/order-online', 'Order Online'],
  ['/login', 'Login'],
])('renders %s directly', (path, heading) => {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  expect(screen.getAllByRole('main')).toHaveLength(1);
});
