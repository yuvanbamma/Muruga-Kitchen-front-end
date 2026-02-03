import React from 'react';
import './Dashboard.css';
import videoBg from '../assets/Yellow and Green Natural Rainy Season Video (1).mp4';

const Dashboard = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="video-wrapper">
                    <video autoPlay loop muted playsInline className="hero-video">
                        <source src={videoBg} type="video/mp4" />
                    </video>
                    <div className="video-overlay"></div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title fade-in">Hungry? Unexpected guests?</h1>
                    <h2 className="hero-subtitle slide-up">Order food from favourite restaurants near you.</h2>

                    <div className="hero-actions slide-up delay-1">
                        <button className="cta-button primary">Order Now</button>
                        <button className="cta-button secondary">Donate Food</button>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="features-section">
                <div className="section-container">
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#fff3e0' }}>🍕</div>
                        <h3>No Minimum Order</h3>
                        <p>Order in for yourself or for the group, with no restrictions on order value.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#e8f5e9' }}>🚲</div>
                        <h3>Live Order Tracking</h3>
                        <p>Know where your order is at all times, from the restaurant to your doorstep.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#e3f2fd' }}>⚡</div>
                        <h3>Lightning Fast Delivery</h3>
                        <p>Experience superfast delivery for food delivered fresh & on time.</p>
                    </div>
                </div>
            </section>

            {/* Inspirational Strip */}
            <section className="inspiration-section">
                <div className="inspiration-content">
                    <span className="quote-mark">“</span>
                    <p className="quote-text">Food is symbolic of love when words are inadequate.</p>
                    <span className="quote-author">— Alan D. Wolfelt</span>
                </div>
            </section>

            {/* Food Categories */}
            <section className="categories-section">
                <div className="section-header">
                    <h2>Inspiration for your first order</h2>
                    <p>From Biryanis to Burgers, we have it all.</p>
                </div>

                <div className="categories-grid">
                    {['Biryani', 'Pizza', 'Burger', 'Chinese', 'Cake', 'Thali'].map((item, index) => (
                        <div key={index} className="category-card">
                            <div className="category-img-box">
                                {/* Placeholder for real food images */}
                            </div>
                            <h4>{item}</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* App Download / CTA Banner */}
            <section className="app-banner">
                <div className="banner-content">
                    <h2>Restaurants in your pocket</h2>
                    <p>Order from your favorite restaurants & track on the go, with the all-new Muruga Kitchen app.</p>
                    <div className="store-buttons">
                        <button className="store-btn">App Store</button>
                        <button className="store-btn">Google Play</button>
                    </div>
                </div>
            </section>

            {/* Professional Footer */}
            <footer className="footer-main">
                <div className="footer-content">
                    <div className="footer-col brand-col">
                        <h3 className="footer-brand">Muruga Kitchen</h3>
                        <p>© 2026 Muruga Kitchen Technologies Pvt. Ltd</p>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li>About</li>
                            <li>Team</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact us</h4>
                        <ul>
                            <li>Help & Support</li>
                            <li>Partner with us</li>
                            <li>Ride with us</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul>
                            <li>Terms & Conditions</li>
                            <li>Cookie Policy</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
