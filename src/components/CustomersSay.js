const testimonials = [
  { id: 'alex', name: 'Alex', rating: 5, review: 'Fresh flavors and a warm welcome. The Greek salad was my favorite.' },
  { id: 'sam', name: 'Sam', rating: 5, review: 'A lovely place to share a Mediterranean meal with friends.' },
  { id: 'jordan', name: 'Jordan', rating: 4, review: 'The lemon dessert was a delicious way to end our meal.' },
];

function CustomersSay() {
  return (
    <section className="home-section testimonials" aria-labelledby="testimonials-title">
      <h2 id="testimonials-title">What our customers say</h2>
      <p className="demo-note">Sample reviews for this capstone project.</p>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.id}>
            <p className="rating" aria-label={`${testimonial.rating} out of 5 stars`}>
              <span aria-hidden="true">{'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}</span>
            </p>
            <h3>{testimonial.name}</h3>
            <blockquote><p>{testimonial.review}</p></blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CustomersSay;
