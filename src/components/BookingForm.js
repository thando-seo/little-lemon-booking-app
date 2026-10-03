import { useState } from 'react';

function BookingForm() {
  const [date, setDate] = useState('');
  const [availableTimes] = useState([
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
  ]);
  const [time, setTime] = useState(availableTimes[0]);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="booking-form" aria-label="Table reservation" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input type="date" id="res-date" value={date} onChange={(event) => setDate(event.target.value)} />

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
