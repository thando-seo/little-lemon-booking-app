import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <section className="page-shell" aria-labelledby="login-title">
      <h1 id="login-title">Customer Login</h1>
      <div className="info-panel">
        <h2>You are welcome at our table</h2>
        <p>Customer accounts and sign-in are not part of this capstone demo. You can explore our menu and reserve a table without an account.</p>
        <div className="page-actions">
          <Link className="action-link" to="/menu">Explore Our Menu</Link>
          <Link className="action-link" to="/booking">Reserve a Table</Link>
          <Link className="action-link" to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
