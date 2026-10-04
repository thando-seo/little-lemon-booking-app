import greekSalad from '../icons-assets/greek salad.jpg';
import bruschetta from '../icons-assets/bruchetta.svg';
import lemonDessert from '../icons-assets/lemon dessert.jpg';

const dishes = [
  { id: 'greek-salad', name: 'Greek Salad', category: 'Fresh & crisp', price: '$12.99', description: 'Crisp lettuce, tomatoes, cucumber, olives, and feta cheese with a Mediterranean dressing.', image: greekSalad, alt: 'Greek salad with tomatoes, cucumber, olives, and feta cheese' },
  { id: 'bruschetta', name: 'Bruschetta', category: 'To share', price: '$5.99', description: 'Toasted bread topped with fresh tomatoes, herbs, and olive oil.', image: bruschetta, alt: 'Toasted bruschetta topped with tomatoes and herbs' },
  { id: 'lemon-dessert', name: 'Lemon Dessert', category: 'Something sweet', price: '$5.00', description: 'A bright, refreshing lemon cake to finish your meal on a sweet note.', image: lemonDessert, alt: 'A slice of layered lemon cake with a cream topping' },
];

function DishCards({ headingLevel = 3, showCategories = false }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className="specials-grid">
      {dishes.map((dish) => (
        <article className="special-card" key={dish.id}>
          <img className="special-image" src={dish.image} alt={dish.alt} loading="lazy" />
          <div className="special-content">
            {showCategories && <p className="dish-category">{dish.category}</p>}
            <div className="special-heading">
              <Heading>{dish.name}</Heading>
              <span className="special-price">{dish.price}</span>
            </div>
            <p>{dish.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default DishCards;
