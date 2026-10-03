import { Link } from 'react-router-dom';
import restaurantFood from '../icons-assets/restauranfood.jpg';

function CallToAction() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title">Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Welcome to Little Lemon, our family-owned Mediterranean restaurant. Enjoy fresh ingredients and traditional recipes served with a modern twist.</p>
        <Link className="action-link" to="/booking">Reserve a Table</Link>
      </div>
      <img className="hero-image" src={restaurantFood} alt="A chef presenting a platter of freshly prepared Mediterranean appetizers" />
    </section>
  );
}

export default CallToAction;
