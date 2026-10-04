import { Link } from 'react-router-dom';
import DishCards from '../components/DishCards';

function MenuPage() {
  return (
    <section className="page-shell" aria-labelledby="menu-title">
      <h1 id="menu-title">Our Menu</h1>
      <p>Fresh Mediterranean flavors, a little something to share, and a sweet finish. Find your Little Lemon favorite.</p>
      <p className="demo-note">Sample menu and prices for this capstone project.</p>
      <DishCards headingLevel={2} showCategories />
      <div className="page-actions">
        <Link className="action-link" to="/booking">Reserve a Table</Link>
      </div>
    </section>
  );
}

export default MenuPage;
