import { useEffect, useState } from 'react';

function getTodayString() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] || '');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const todayString = getTodayString();
  const isFormValid = Boolean(
    date && date >= todayString &&
    time && availableTimes.includes(time) &&
    Number.isInteger(Number(guests)) && Number(guests) >= 1 && Number(guests) <= 10 &&
    occasion
  );

  useEffect(() => {
    if (!availableTimes.includes(time)) {
      setTime(availableTimes[0] || '');
    }
  }, [availableTimes, time]);

  function handleDateChange(event) {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    dispatch({ type: 'UPDATE_DATE', date: selectedDate });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormValid || date < getTodayString() || !event.currentTarget.checkValidity()) {
      return;
    }
    submitForm({ date, time, guests: Number(guests), occasion });
  }

  return (
    <form className="booking-form" aria-label="Table reservation" aria-describedby="booking-instructions" onSubmit={handleSubmit}>
      <p id="booking-instructions">All fields are required. Choose today or a future date and reserve for 1–10 guests.</p>
      <label htmlFor="res-date">Choose date</label>
      <input type="date" id="res-date" required min={todayString} value={date} onChange={handleDateChange} />

      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" required value={time} onChange={(event) => setTime(event.target.value)}>
        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>{availableTime}</option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input type="number" id="guests" required min="1" max="10" value={guests} onChange={(event) => setGuests(event.target.value)} />

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" required value={occasion} onChange={(event) => setOccasion(event.target.value)}>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button type="submit" className="booking-submit" disabled={!isFormValid} aria-label="On Click" aria-labelledby="booking-submit-label">
        <span id="booking-submit-label">Make Your Reservation</span>
      </button>
    </form>
  );
}

export default BookingForm;
