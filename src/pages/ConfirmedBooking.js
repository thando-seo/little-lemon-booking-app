import { useEffect, useRef } from 'react';

function ConfirmedBooking() {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current.focus();
  }, []);

  return (
    <section className="page-shell" aria-labelledby="confirmation-title">
      <h1 id="confirmation-title" tabIndex={-1} ref={headingRef}>Booking Confirmed!</h1>
      <p>Thank you for choosing Little Lemon. Your reservation is confirmed, and we look forward to welcoming you.</p>
    </section>
  );
}

export default ConfirmedBooking;
