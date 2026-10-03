import marioAndAdrian from '../icons-assets/Mario and Adrian A.jpg';

function Chicago() {
  return (
    <section className="home-section chicago" aria-labelledby="chicago-title">
      <div>
        <h2 id="chicago-title">Little Lemon</h2>
        <h3>Chicago</h3>
        <p>Brothers Mario and Adrian bring a love of Mediterranean cooking to their family-owned Chicago restaurant. Little Lemon combines traditional recipes with a modern touch, creating a welcoming place to gather over good food.</p>
      </div>
      <img className="chicago-image" src={marioAndAdrian} alt="Mario and Adrian working together in the Little Lemon kitchen" loading="lazy" />
    </section>
  );
}

export default Chicago;
