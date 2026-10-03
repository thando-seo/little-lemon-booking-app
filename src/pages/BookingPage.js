import BookingForm from '../components/BookingForm';

function BookingPage() {
  return (
    <section className="page-shell" aria-labelledby="booking-title">
      <h1 id="booking-title">Reserve a Table</h1>
      <p>We look forward to welcoming you to Little Lemon. Choose your reservation details below. Online reservation submission is coming soon.</p>
      <BookingForm />
    </section>
  );
}

export default BookingPage;
