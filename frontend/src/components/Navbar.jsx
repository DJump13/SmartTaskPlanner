// components/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const hideNavbar = location.pathname === '/';

  if (hideNavbar) return null;

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Smart Task Planner</h1>
      {isLoggedIn ? (
        <button className="navbar-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="navbar-button" onClick={handleLogin}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
