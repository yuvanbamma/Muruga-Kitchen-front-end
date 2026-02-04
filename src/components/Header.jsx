import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = ({ currentView, setView }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="logo-section" onClick={() => setView('dashboard')}>
                    <span className="logo-icon">🍽️</span>
                    <span className="logo-text">Muruga Kitchen</span>
                </div>

                {/* Search Bar - Hidden on small mobile */}
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
                            placeholder="Find your craving..."
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Navigation Menu Trigger */}
                <div className="header-menu-system">
                    <ThemeToggle />
                    <div className="explore-trigger" onClick={() => setMenuOpen(!menuOpen)}>
                        <button className="explore-pill">
                            <span className="hamburger">☰</span>
                            <span className="explore-label">Explore</span>
                        </button>

                        {menuOpen && (
                            <>
                                <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
                                <nav className="compact-dropdown slide-up">
                                    <div
                                        className={`compact-item ${currentView === 'dashboard' ? 'active' : ''}`}
                                        onClick={() => setView('dashboard')}
                                    >
                                        <span className="icon">🏠</span> Home
                                    </div>
                                    <div
                                        className={`compact-item ${currentView === 'list' ? 'active' : ''}`}
                                        onClick={() => setView('list')}
                                    >
                                        <span className="icon">🥡</span> Order Now
                                    </div>
                                    <div
                                        className={`compact-item ${currentView === 'create' ? 'active' : ''}`}
                                        onClick={() => setView('create')}
                                    >
                                        <span className="icon">➕</span> Add Listing
                                    </div>
                                    <div className="compact-divider"></div>
                                    <div className="compact-item">
                                        <span className="icon">👤</span> Profile
                                    </div>
                                    <div className="compact-item">
                                        <span className="icon">🛒</span> Your Cart
                                    </div>
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
