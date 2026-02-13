import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const { user, logout, isOrphanage, isAuthenticated, isHero } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <span className="header-logo-text">Hopeful Hands</span>
        </Link>

        <div className="header-search">
          <input
            type="search"
            placeholder="Search for needs, organizations, or locations..."
            className="header-search-input"
            aria-label="Search"
          />
        </div>

        <div className="header-actions">
          {!isAuthenticated && (
            <>
              <button className="header-btn-ghost" onClick={() => handleNav('/login')}>Sign in</button>
              <Link to="/signup" className="header-btn-primary">Join</Link>
            </>
          )}
          <ThemeToggle />
          <div className="header-menu-wrap">
            <button
              className="header-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <span className="header-menu-icon" />
              <span>{isAuthenticated ? (isOrphanage ? 'Orphanage' : 'Menu') : 'Menu'}</span>
            </button>
            {menuOpen && (
              <>
                <div className="header-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />
                <nav className="header-nav" role="navigation">
                  <button className={`header-nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => handleNav('/')}>Home</button>
                  <button className={`header-nav-item ${isActive('/donations') ? 'active' : ''}`} onClick={() => handleNav('/donations')}>Browse Needs</button>
                  {isOrphanage && (
                    <>
                      <button className={`header-nav-item ${isActive('/my-requirements') ? 'active' : ''}`} onClick={() => handleNav('/my-requirements')}>My Posts</button>
                      <button className={`header-nav-item ${isActive('/create') ? 'active' : ''}`} onClick={() => handleNav('/create')}>Create Post</button>
                    </>
                  )}
                  <span className="header-nav-divider" />
                  {isAuthenticated ? (
                    <>
                      <button className="header-nav-item" onClick={() => handleNav('/')}>Dashboard</button>
                      {isHero && <button className={`header-nav-item ${isActive('/awards') ? 'active' : ''}`} onClick={() => handleNav('/awards')}>Recognition</button>}
                      <button className="header-nav-item header-nav-item-logout" onClick={handleLogout}>Sign Out</button>
                    </>
                  ) : (
                    <>
                      <button className="header-nav-item" onClick={() => handleNav('/login')}>Sign In</button>
                      <button className="header-nav-item" onClick={() => handleNav('/signup')}>Get Started</button>
                    </>
                  )}
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
