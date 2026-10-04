import { Link } from 'react-router-dom';
import DishCards from '../components/DishCards';

function OrderOnlinePage() {
  return (
    <section className="page-shell" aria-labelledby="order-title">
      <h1 id="order-title">Order Online</h1>
      <p>Start with a fresh salad, add something to share, and finish with a little lemon. Browse our menu and plan your next Mediterranean meal.</p>
      <p className="demo-note">This capstone is a menu preview. Online ordering and payment are not available.</p>
      <section className="home-section" aria-labelledby="order-favorites">
        <h2 id="order-favorites">A few favorites</h2>
        <DishCards />
      </section>
      <div className="page-actions">
        <Link className="action-link" to="/menu">Browse the Menu</Link>
        <Link className="action-link" to="/booking">Reserve a Table</Link>
      </div>
    </section>
  );
}

export default OrderOnlinePage;
