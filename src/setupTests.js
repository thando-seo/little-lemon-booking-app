// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// CRA's JSDOM environment lacks the text encoding APIs React Router uses.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Jest does not load the external script from public/index.html.
beforeEach(() => {
  global.fetchAPI = jest.fn(() => [
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
  ]);
});
