import React from 'react';
import './Dashboard.css';

const Dashboard = ({ setView }) => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="food-animation-bg">
                    <div className="food-track">
                        <span>🍎</span><span>🍔</span><span>🍕</span><span>🌮</span><span>🍣</span><span>🍜</span><span>🍩</span><span>🍦</span><span>🥑</span><span>🍤</span>
                        <span>🥐</span><span>🥓</span><span>🥩</span><span>🌭</span><span>🍟</span><span>🍪</span><span>🍫</span><span>🥞</span><span>🥡</span><span>🍱</span>
                        <span>🍎</span><span>🍔</span><span>🍕</span><span>🌮</span><span>🍣</span><span>🍜</span><span>🍩</span><span>🍦</span><span>🥑</span><span>🍤</span>
                    </div>
                    <div className="food-track reverse">
                        <span>🍉</span><span>🥨</span><span>🍗</span><span>🍚</span><span>🥣</span><span>🥗</span><span>🥪</span><span>🥫</span><span>🎂</span><span>🍰</span>
                        <span>🧁</span><span>🥧</span><span>🍮</span><span>🍭</span><span>🍬</span><span>🍿</span><span>🥟</span><span>🥠</span><span>🍢</span><span>🍡</span>
                        <span>🍉</span><span>🥨</span><span>🍗</span><span>🍚</span><span>🥣</span><span>🥗</span><span>🥪</span><span>🥫</span><span>🎂</span><span>🍰</span>
                    </div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title fade-in">Experience Food <br /><span>Like Never Before</span></h1>
                    <h2 className="hero-subtitle slide-up">Fresh home-style food from Muruga Kitchen, delivered to your doorstep.</h2>

                    <div className="hero-actions slide-up delay-1">
                        <button
                            className="cta-button primary-gradient"
                            onClick={() => setView('list')}
                        >
                            Explore Menu
                        </button>
                        <button className="cta-button secondary-glass">Share Love</button>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="features-section">
                <div className="section-container">
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#EEF2FF' }}>🛡️</div>
                        <h3>Quality Assured</h3>
                        <p>Every dish is prepared with the finest ingredients and utmost hygiene.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#ECFDF5' }}>🌟</div>
                        <h3>Top Rated Chefs</h3>
                        <p>Crafted by experts who understand the soul of traditional recipes.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#FFF7ED' }}>🚀</div>
                        <h3>Priority Delivery</h3>
                        <p>Hot and fresh meals delivered in record time to keep the flavors alive.</p>
                    </div>
                </div>
            </section>

            {/* Inspirational Strip */}
            <section className="inspiration-banner">
                <div className="inspiration-content">
                    <p className="quote-text">“Cooking is an art, but all art requires knowing something about the craft.”</p>
                </div>
            </section>

            {/* Food Categories (Inspiration) */}
            <section className="categories-section">
                <div className="section-header">
                    <h2>Inspiration for your first order</h2>
                    <p>Curated selections to tantalize your taste buds.</p>
                </div>

                <div className="categories-grid">
                    {[
                        { name: 'Biryani', emoji: '🍛' },
                        { name: 'Pizza', emoji: '🍕' },
                        { name: 'Burger', emoji: '🍔' },
                        { name: 'Chinese', emoji: '🍜' },
                        { name: 'Desserts', emoji: '🍰' },
                        { name: 'Healthy', emoji: '🥗' }
                    ].map((item, index) => (
                        <div key={index} className="category-card">
                            <div className="category-img-box">
                                <span className="cat-emoji">{item.emoji}</span>
                            </div>
                            <h4>{item.name}</h4>
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
                        <button className="store-btn google-play">Google Play</button>
                        <button className="store-btn app-store">App Store</button>
                    </div>
                </div>
            </section>

            {/* Professional Footer */}
            <footer className="footer-main">
                <div className="footer-container">
                    <div className="footer-row">
                        <div className="footer-col brand-col">
                            <h3 className="footer-brand">Muruga Kitchen</h3>
                            <p className="copyright">© 2026 Muruga Kitchen Technologies Pvt. Ltd</p>
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
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
