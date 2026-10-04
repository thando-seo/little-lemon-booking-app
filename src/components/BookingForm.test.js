import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import BookingForm from './BookingForm';
import { initializeTimes } from './Main';

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(2026, 9, 4, 12));
});

afterEach(() => jest.useRealTimers());

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

test('submission prevents browser reload and passes the controlled form values', () => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={initializeTimes()} dispatch={jest.fn()} submitForm={submitForm} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  userEvent.selectOptions(screen.getByLabelText('Choose time'), '20:00');
  userEvent.clear(screen.getByLabelText('Number of guests'));
  userEvent.type(screen.getByLabelText('Number of guests'), '4');
  userEvent.selectOptions(screen.getByLabelText('Occasion'), 'Anniversary');
  const form = screen.getByRole('form', { name: 'Table reservation' });
  const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
  fireEvent(form, submitEvent);
  expect(submitEvent.defaultPrevented).toBe(true);
  expect(submitForm).toHaveBeenCalledTimes(1);
  expect(submitForm).toHaveBeenCalledWith({ date: '2026-11-15', time: '20:00', guests: 4, occasion: 'Anniversary' });
  expect(screen.getByLabelText('Choose time')).toHaveValue('20:00');
});

test('date changes dispatch the selected date while keeping local date state', () => {
  const dispatch = jest.fn();
  render(<BookingForm availableTimes={initializeTimes()} dispatch={dispatch} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  expect(screen.getByLabelText('Choose date')).toHaveValue('2026-11-15');
  expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_DATE', date: '2026-11-15' });
});

test('changing the date displays the times returned by the API', () => {
  render(<MemoryRouter initialEntries={['/booking']}><App /></MemoryRouter>);
  global.fetchAPI.mockReturnValue(['18:30', '20:30']);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-15' } });
  const options = within(screen.getByLabelText('Choose time')).getAllByRole('option');
  expect(options.map((option) => option.value)).toEqual(['18:30', '20:30']);
  expect(screen.getByLabelText('Choose time')).toHaveValue('18:30');
  expect(global.fetchAPI).toHaveBeenLastCalledWith(new Date(2026, 10, 15));
});

test('all fields are required and date uses today as its local minimum', () => {
  render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} />);
  ['Choose date', 'Choose time', 'Number of guests', 'Occasion'].forEach((label) => {
    expect(screen.getByLabelText(label)).toBeRequired();
  });
  expect(screen.getByLabelText('Choose date')).toHaveAttribute('min', '2026-10-04');
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeDisabled();
});

test.each(['', '0', '11', '1.5'])('invalid guest value %s disables submission and cannot bypass the submit guard', (guests) => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} submitForm={submitForm} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-18' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: guests } });
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeDisabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(submitForm).not.toHaveBeenCalled();
});

test.each(['', '2026-10-03'])('invalid date %s prevents submission', (date) => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} submitForm={submitForm} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: date } });
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeDisabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(submitForm).not.toHaveBeenCalled();
});

test.each(['1', '10'])('today and guest limit %s allow valid submission', (guests) => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} submitForm={submitForm} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-10-04' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: guests } });
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeEnabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(submitForm).toHaveBeenCalledWith({ date: '2026-10-04', time: '17:00', guests: Number(guests), occasion: 'Birthday' });
});

test('availability changes synchronize time and empty availability prevents submission', () => {
  const submitForm = jest.fn();
  const props = { dispatch: jest.fn(), submitForm };
  const { rerender } = render(<BookingForm {...props} availableTimes={['17:00']} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-18' } });
  rerender(<BookingForm {...props} availableTimes={['20:00']} />);
  expect(screen.getByLabelText('Choose time')).toHaveValue('20:00');
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeEnabled();
  rerender(<BookingForm {...props} availableTimes={[]} />);
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeDisabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(submitForm).not.toHaveBeenCalled();
});

test('empty occasion prevents submission', () => {
  const submitForm = jest.fn();
  render(<BookingForm availableTimes={['17:00']} dispatch={jest.fn()} submitForm={submitForm} />);
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2026-11-18' } });
  fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: '' } });
  expect(screen.getByRole('button', { name: 'Make Your Reservation' })).toBeDisabled();
  fireEvent.submit(screen.getByRole('form'));
  expect(submitForm).not.toHaveBeenCalled();
});
