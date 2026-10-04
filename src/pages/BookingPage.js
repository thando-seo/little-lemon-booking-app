import BookingForm from '../components/BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="page-shell" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a Table</h1>
      <p>We look forward to welcoming you to Little Lemon. Choose your reservation details below.</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />
    </section>
  );
}

export default BookingPage;
