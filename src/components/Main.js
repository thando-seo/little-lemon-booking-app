/* global fetchAPI */
import { useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import MenuPage from '../pages/MenuPage';
import BookingPage from '../pages/BookingPage';
import OrderOnlinePage from '../pages/OrderOnlinePage';
import LoginPage from '../pages/LoginPage';

export function initializeTimes() {
  return fetchAPI(new Date());
}

export function updateTimes(state, action) {
  if (action.type === 'UPDATE_DATE' && action.date) {
    // Parse as a local calendar date so time zones cannot shift the chosen day.
    const [year, month, day] = action.date.split('-').map(Number);
    return fetchAPI(new Date(year, month - 1, day));
  }
  return state;
}

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);

  return (
    <main className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
}

export default Main;
