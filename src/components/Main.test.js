import { initializeTimes, updateTimes } from './Main';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('initializeTimes calls fetchAPI with today and returns its available times', () => {
  const apiTimes = ['17:30', '19:00'];
  global.fetchAPI.mockReturnValue(apiTimes);
  const before = new Date();
  expect(initializeTimes()).toBe(apiTimes);
  expect(global.fetchAPI).toHaveBeenCalledTimes(1);
  const date = global.fetchAPI.mock.calls[0][0];
  expect(date).toBeInstanceOf(Date);
  expect(date.getTime()).toBeGreaterThanOrEqual(before.getTime());
  expect(date.getTime()).toBeLessThanOrEqual(Date.now());
});

test.each(['2026-11-15', '2026-11-16'])('updateTimes fetches availability for selected date %s', (date) => {
  const apiTimes = ['18:30', '21:00'];
  global.fetchAPI.mockReturnValue(apiTimes);
  expect(updateTimes(['17:00'], { type: 'UPDATE_DATE', date })).toBe(apiTimes);
  const [year, month, day] = date.split('-').map(Number);
  expect(global.fetchAPI).toHaveBeenCalledWith(new Date(year, month - 1, day));
});

test('updateTimes preserves state for unrelated actions', () => {
  const times = initializeTimes();
  expect(updateTimes(times, { type: 'UNKNOWN' })).toBe(times);
});

test('clearing the date preserves times without calling fetchAPI', () => {
  const suppliedTimes = ['18:00', '20:00'];
  const result = updateTimes(suppliedTimes, { type: 'UPDATE_DATE', date: '' });
  expect(result).toEqual(suppliedTimes);
  expect(result).toBe(suppliedTimes);
  expect(global.fetchAPI).not.toHaveBeenCalled();
});

test('successful API submission navigates to confirmation', async () => {
  render(<MemoryRouter initialEntries={['/booking']}><App /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  userEvent.click(screen.getByRole('button', { name: 'Make Your Reservation' }));
  expect(global.submitAPI).toHaveBeenCalledWith({ date: '2026-11-15', time: '17:00', guests: 1, occasion: 'Birthday' });
  expect(await screen.findByRole('heading', { name: 'Booking Confirmed!' })).toBeInTheDocument();
  expect(screen.queryByRole('form', { name: 'Table reservation' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('main')).toHaveLength(1);
});

test('unsuccessful API submission stays on booking and preserves entered values', () => {
  global.submitAPI.mockReturnValue(false);
  render(<MemoryRouter initialEntries={['/booking']}><App /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  userEvent.click(screen.getByRole('button', { name: 'Make Your Reservation' }));
  expect(global.submitAPI).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('form', { name: 'Table reservation' })).toBeInTheDocument();
  expect(screen.getByLabelText('Choose date')).toHaveValue('2026-11-15');
  expect(screen.queryByRole('heading', { name: 'Booking Confirmed!' })).not.toBeInTheDocument();
});

test('confirmation route can render directly within the existing main', () => {
  render(<MemoryRouter initialEntries={['/confirmed']}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Booking Confirmed!' })).toBeInTheDocument();
  expect(screen.getAllByRole('main')).toHaveLength(1);
  expect(global.submitAPI).not.toHaveBeenCalled();
});
