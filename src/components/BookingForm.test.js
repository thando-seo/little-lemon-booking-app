import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import BookingForm from './BookingForm';
import { initializeTimes } from './Main';

test('renders the BookingForm Choose date label', () => {
  render(<BookingForm availableTimes={initializeTimes()} dispatch={jest.fn()} />);
  expect(screen.getByText('Choose date', { exact: true })).toBeInTheDocument();
});

test('booking route renders labeled fields with sensible initial values', () => {
  render(<MemoryRouter initialEntries={['/booking']}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Reserve a Table' })).toBeInTheDocument();
  expect(screen.getByLabelText('Choose date')).toHaveValue('');
  expect(screen.getByLabelText('Choose time')).toHaveValue('17:00');
  expect(screen.getByLabelText('Number of guests')).toHaveValue(1);
  expect(screen.getByLabelText('Number of guests')).toHaveAttribute('min', '1');
  expect(screen.getByLabelText('Number of guests')).toHaveAttribute('max', '10');
  expect(screen.getByLabelText('Occasion')).toHaveValue('Birthday');
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeInTheDocument();
  expect(screen.getAllByRole('main')).toHaveLength(1);
});

test('renders all six available time options', () => {
  render(<BookingForm availableTimes={initializeTimes()} dispatch={jest.fn()} />);
  const options = within(screen.getByLabelText('Choose time')).getAllByRole('option');
  expect(options.map((option) => option.value)).toEqual([
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
  ]);
});

test('all controlled fields reflect edits without changing available times', () => {
  render(<MemoryRouter initialEntries={['/booking']}><App /></MemoryRouter>);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  userEvent.selectOptions(screen.getByLabelText('Choose time'), '20:00');
  userEvent.clear(screen.getByLabelText('Number of guests'));
  userEvent.type(screen.getByLabelText('Number of guests'), '4');
  userEvent.selectOptions(screen.getByLabelText('Occasion'), 'Anniversary');
  expect(screen.getByLabelText('Choose date')).toHaveValue('2026-11-15');
  expect(screen.getByLabelText('Choose time')).toHaveValue('20:00');
  expect(screen.getByLabelText('Number of guests')).toHaveValue(4);
  expect(screen.getByLabelText('Occasion')).toHaveValue('Anniversary');
  expect(within(screen.getByLabelText('Choose time')).getAllByRole('option')).toHaveLength(6);
});

test('submission prevents browser navigation and preserves the form', () => {
  render(<BookingForm availableTimes={initializeTimes()} dispatch={jest.fn()} />);
  const form = screen.getByRole('form', { name: 'Table reservation' });
  const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
  fireEvent(form, submitEvent);
  expect(submitEvent.defaultPrevented).toBe(true);
  expect(screen.getByLabelText('Choose time')).toHaveValue('17:00');
});

test('date changes dispatch the selected date while keeping local date state', () => {
  const dispatch = jest.fn();
  render(<BookingForm availableTimes={initializeTimes()} dispatch={dispatch} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  expect(screen.getByLabelText('Choose date')).toHaveValue('2026-11-15');
  expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_DATE', date: '2026-11-15' });
});
