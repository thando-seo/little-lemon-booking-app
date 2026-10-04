import { Link } from 'react-router-dom';
import DishCards from './DishCards';

function Specials() {
  return (
    <section className="home-section" aria-labelledby="specials-title">
      <header className="section-heading">
        <h2 id="specials-title">This week’s specials</h2>
        <Link className="action-link" to="/menu">Online Menu</Link>
      </header>
      <DishCards />
    </section>
  );
}

export default Specials;
