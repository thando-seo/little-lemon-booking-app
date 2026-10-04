import { initializeTimes, updateTimes } from './Main';

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
