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
  expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(nav.getByRole('link', { name: 'Reservations' })).not.toHaveAttribute('aria-current');
});

test('keyboard users can reach a skip link targeting the main landmark', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  userEvent.tab();
  const skipLink = screen.getByRole('link', { name: 'Skip to main content' });
  expect(skipLink).toHaveFocus();
  expect(skipLink).toHaveAttribute('href', `#${screen.getByRole('main').id}`);
  expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
});

test('reservation call to action opens the booking page', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  userEvent.click(screen.getByRole('link', { name: 'Reserve a Table' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Reserve a Table' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Reservations' })).toHaveAttribute('aria-current', 'page');
  expect(screen.queryByRole('heading', { name: /this week’s specials/i })).not.toBeInTheDocument();
});

test.each([
  ['/about', 'About Little Lemon'],
  ['/menu', 'Our Menu'],
  ['/booking', 'Reserve a Table'],
  ['/order-online', 'Order Online'],
  ['/login', 'Customer Login'],
])('renders %s directly', (path, heading) => {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  expect(screen.getAllByRole('main')).toHaveLength(1);
});

test('menu presents the sample dishes with descriptions, prices, and images', () => {
  render(<MemoryRouter initialEntries={['/menu']}><App /></MemoryRouter>);
  expect(screen.getByText('Sample menu and prices for this capstone project.')).toBeInTheDocument();
  const cards = screen.getAllByRole('article');
  expect(cards).toHaveLength(3);
  [['Greek Salad', '$12.99'], ['Bruschetta', '$5.99'], ['Lemon Dessert', '$5.00']].forEach(([name, price], index) => {
    expect(within(cards[index]).getByRole('heading', { level: 2, name })).toBeInTheDocument();
    expect(within(cards[index]).getByText(price)).toBeInTheDocument();
    expect(within(cards[index]).getByRole('img')).toHaveAttribute('alt', expect.any(String));
  });
  userEvent.click(screen.getByRole('link', { name: 'Reserve a Table' }));
  expect(screen.getByRole('form', { name: 'Table reservation' })).toBeInTheDocument();
});
