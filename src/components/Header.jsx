import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
    const { user, logout, isHero, isOrphanage, isAuthenticated } = useAuth();
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
        <header className="site-header">
            <div className="header-container">
                {/* Logo Section */}
                <Link to="/" className="logo-section">
                    <span className="logo-icon">🍽️</span>
                    <span className="logo-text">Muruga Kitchen</span>
                </Link>

                {/* Search Bar */}
                <div className="search-bar-container">
                    <div className="location-pill">
                        <span className="location-icon">📍</span>
                        <span className="location-text">Bangalore</span>
                    </div>
                    <div className="search-divider"></div>
                    <div className="search-input-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Find surplus food for mission..."
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Navigation Menu Trigger */}
                <div className="header-menu-system">
                    {!isAuthenticated && (
                        <div className="auth-triggers-header">
                            <button className="login-minimal-btn" onClick={() => handleNav('/login')}>
                                Sign In
                            </button>
                            <Link to="/signup" className="signup-header-btn">
                                Join Mission
                            </Link>
                        </div>
                    )}

                    <ThemeToggle />

                    <div className="explore-trigger">
                        <button className="explore-pill" onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <span className="explore-label">
                                {isAuthenticated ? (isOrphanage ? "Orphanage Portal" : "Hero Sanctuary") : 'Explore'}
                            </span>
                        </button>

                        {menuOpen && (
                            <>
                                <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
                                <nav className="compact-dropdown slide-up">
                                    <div
                                        className={`compact-item ${isActive('/') ? 'active' : ''}`}
                                        onClick={() => handleNav('/')}
                                    >
                                        <span className="icon">🏠</span> Home
                                    </div>
                                    <div
                                        className={`compact-item ${isActive('/donations') ? 'active' : ''}`}
                                        onClick={() => handleNav('/donations')}
                                    >
                                        <span className="icon">🍲</span> Requirement List
                                    </div>

                                    {isOrphanage && (
                                        <div
                                            className={`compact-item ${isActive('/create') ? 'active' : ''}`}
                                            onClick={() => handleNav('/create')}
                                        >
                                            <span className="icon">🎁</span> Post Requirement
                                        </div>
                                    )}

                                    <div className="compact-divider"></div>

                                    {isAuthenticated ? (
                                        <>
                                            <div className="compact-item" onClick={() => handleNav('/')}>
                                                <span className="icon">👤</span> My Dash
                                            </div>
                                            <div className="compact-item logout-item" onClick={handleLogout}>
                                                <span className="icon">🚪</span> Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="compact-item" onClick={() => handleNav('/login')}>
                                                <span className="icon">🔑</span> Login
                                            </div>
                                            <div className="compact-item" onClick={() => handleNav('/signup')}>
                                                <span className="icon">📝</span> Signup
                                            </div>
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
