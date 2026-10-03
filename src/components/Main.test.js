import { initializeTimes, updateTimes } from './Main';

test('initializeTimes returns the six initial booking times', () => {
  expect(initializeTimes()).toEqual([
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
  ]);
});

test.each(['2026-11-15', '2026-11-16', ''])('updateTimes keeps the same options for date %s', (date) => {
  const times = initializeTimes();
  expect(updateTimes(times, { type: 'UPDATE_DATE', date })).toEqual(times);
});

test('updateTimes preserves state for unrelated actions', () => {
  const times = initializeTimes();
  expect(updateTimes(times, { type: 'UNKNOWN' })).toBe(times);
});

test('updateTimes returns the supplied state rather than recreating the initial times', () => {
  const suppliedTimes = ['18:00', '20:00'];
  const result = updateTimes(suppliedTimes, { type: 'UPDATE_DATE', date: '2026-11-15' });
  expect(result).toEqual(suppliedTimes);
  expect(result).toBe(suppliedTimes);
});
