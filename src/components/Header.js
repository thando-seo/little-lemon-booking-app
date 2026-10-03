import logo from '../icons-assets/Logo.svg';

function Header() {
  return (
    <header className="site-header">
      <img className="site-logo" src={logo} alt="Little Lemon" width="148" height="40" />
    </header>
  );
}

export default Header;
