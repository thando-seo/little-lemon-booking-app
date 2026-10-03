import { Link } from 'react-router-dom';
import greekSalad from '../icons-assets/greek salad.jpg';
import bruschetta from '../icons-assets/bruchetta.svg';
import lemonDessert from '../icons-assets/lemon dessert.jpg';

const specials = [
  { id: 'greek-salad', name: 'Greek Salad', price: '$12.99', description: 'Crisp lettuce, tomatoes, cucumber, olives, and feta cheese with a Mediterranean dressing.', image: greekSalad, alt: 'Greek salad with tomatoes, cucumber, olives, and feta cheese' },
  { id: 'bruschetta', name: 'Bruschetta', price: '$5.99', description: 'Toasted bread topped with fresh tomatoes, herbs, and olive oil.', image: bruschetta, alt: 'Toasted bruschetta topped with tomatoes and herbs' },
  { id: 'lemon-dessert', name: 'Lemon Dessert', price: '$5.00', description: 'A bright, refreshing lemon cake to finish your meal on a sweet note.', image: lemonDessert, alt: 'A slice of layered lemon cake with a cream topping' },
];

function Specials() {
  return (
    <section className="home-section" aria-labelledby="specials-title">
      <header className="section-heading">
        <h2 id="specials-title">This week’s specials</h2>
        <Link className="action-link" to="/menu">Online Menu</Link>
      </header>
      <div className="specials-grid">
        {specials.map((special) => (
          <article className="special-card" key={special.id}>
            <img className="special-image" src={special.image} alt={special.alt} loading="lazy" />
            <div className="special-content">
              <div className="special-heading">
                <h3>{special.name}</h3>
                <span className="special-price">{special.price}</span>
              </div>
              <p>{special.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Specials;
