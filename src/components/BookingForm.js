import { useState } from 'react';

function BookingForm({ availableTimes, dispatch }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0]);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  function handleDateChange(event) {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    dispatch({ type: 'UPDATE_DATE', date: selectedDate });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="booking-form" aria-label="Table reservation" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input type="date" id="res-date" value={date} onChange={handleDateChange} />

      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" value={time} onChange={(event) => setTime(event.target.value)}>
        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>{availableTime}</option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input type="number" id="guests" min="1" max="10" value={guests} onChange={(event) => setGuests(event.target.value)} />

      <label htmlFor="occasion">Occasion</label>
      <select id="occasion" value={occasion} onChange={(event) => setOccasion(event.target.value)}>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button type="submit" className="booking-submit">Make Your Reservation</button>
    </form>
  );
}

export default BookingForm;
