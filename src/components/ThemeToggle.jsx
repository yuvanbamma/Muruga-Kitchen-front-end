import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="theme-toggle-track">
                <div className={`theme-toggle-thumb ${theme}`}>
                    {theme === 'light' ? (
                        <span className="theme-icon sun">☀️</span>
                    ) : (
                        <span className="theme-icon moon">🌙</span>
                    )}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
