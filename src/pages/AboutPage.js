import { Link } from 'react-router-dom';
import Chicago from '../components/Chicago';
import restaurant from '../icons-assets/restaurant.jpg';

function AboutPage() {
  return (
    <section className="page-shell" aria-labelledby="about-title">
      <h1 id="about-title">About Little Lemon</h1>
      <p>Little Lemon is a family-owned Mediterranean restaurant in Chicago, bringing traditional recipes and a modern touch to the table.</p>
      <Chicago />
      <section className="home-section" aria-labelledby="about-community">
        <h2 id="about-community">A place to gather</h2>
        <p>Inspired by the flavors of the Mediterranean, our table brings together fresh ingredients, familiar recipes, and the joy of sharing a meal. From family celebrations to a catch-up with friends, everyone has a place at Little Lemon.</p>
        <img className="about-image" src={restaurant} alt="The welcoming dining space at Little Lemon" loading="lazy" />
      </section>
      <div className="page-actions">
        <Link className="action-link" to="/booking">Reserve a Table</Link>
        <Link className="action-link" to="/menu">Explore Our Menu</Link>
      </div>
    </section>
  );
}

export default AboutPage;
