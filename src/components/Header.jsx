import React from 'react';
import './Header.css';

const Header = ({ currentView, setView }) => {
    return (
        <header className="site-header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="logo-section" onClick={() => setView('dashboard')}>
                    <span className="logo-icon">&#127828;</span>
                    <span className="logo-text">Muruga Kitchen</span>
                </div>

                {/* Search Bar */}
                <div className="search-bar-container">
                    <div className="location-pill">
                        <span className="location-icon">&#128205;</span>
                        <span className="location-text">Bangalore</span>
                        <span className="dropdown-arrow">&#9662;</span>
                    </div>
                    <div className="search-divider"></div>
                    <div className="search-input-box">
                        <span className="search-icon">&#128269;</span>
                        <input
                            type="text"
                            placeholder="Search for restaurant, cuisine or a dish"
                            className="search-input"
                        />
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
                            onClick={() => setView('dashboard')}
                        >
                            <span className="nav-icon">&#127968;</span>
                            <span className="nav-text">Home</span>
                        </li>
                        <li
                            className={`nav-item ${currentView === 'list' || currentView === 'details' ? 'active' : ''}`}
                            onClick={() => setView('list')}
                        >
                            <span className="nav-icon">&#127860;</span>
                            <span className="nav-text">Order</span>
                        </li>
                        <li
                            className={`nav-item ${currentView === 'create' ? 'active' : ''}`}
                            onClick={() => setView('create')}
                        >
                            <span className="nav-icon">&#10133;</span>
                            <span className="nav-text">Add Food</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-icon">&#128100;</span>
                            <span className="nav-text">Profile</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-icon">&#128722;</span>
                            <span className="nav-text">Cart</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
