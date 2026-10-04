import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <ul className="site-nav-list">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        <li><NavLink to="/booking">Reservations</NavLink></li>
        <li><NavLink to="/order-online">Order Online</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
