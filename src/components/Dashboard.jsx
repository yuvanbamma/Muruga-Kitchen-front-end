import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isDonor, isDeliveryBoy } = useAuth();

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="food-animation-bg">
                    <div className="food-track">
                        <span>🍎</span><span>🍔</span><span>🍕</span><span>🌮</span><span>🍣</span><span>🍜</span><span>🍩</span><span>🍦</span><span>🥑</span><span>🍤</span>
                        <span>🥐</span><span>🥓</span><span>🥩</span><span>🌭</span><span>🍟</span><span>🍪</span><span>🍫</span><span>🥞</span><span>🥡</span><span>🍱</span>
                    </div>
                </div>

                <div className="hero-content">
                    <h1 className="hero-title fade-in">Experience Food <br /><span>Like Never Before</span></h1>
                    <h2 className="hero-subtitle slide-up">Fresh home-style food from Muruga Kitchen, delivered to your doorstep.</h2>

                    <div className="hero-actions slide-up delay-1">
                        {isDonor ? (
                            <button
                                className="cta-button primary-gradient"
                                onClick={() => navigate('/create')}
                            >
                                Post New Food
                            </button>
                        ) : isDeliveryBoy ? (
                            <button
                                className="cta-button primary-gradient"
                                onClick={() => navigate('/menu')}
                            >
                                Start Delivering
                            </button>
                        ) : (
                            <button
                                className="cta-button primary-gradient"
                                onClick={() => navigate('/menu')}
                            >
                                Explore Menu
                            </button>
                        )}

                        {!isAuthenticated && (
                            <button
                                className="cta-button secondary-glass"
                                onClick={() => navigate('/signup')}
                            >
                                Join as Partner
                            </button>
                        )}
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
                    <div className="feature-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#FDF2F8' }}>📜</div>
                        <h3>Bharathi's Vision</h3>
                        <p className="poem-text">"If even a single person has no food, we shall destroy this world."</p>
                    </div>
                </div>
            </section>

            {/* Professional Vision Section */}
            <section className="mission-highlight">
                <div className="mission-content">
                    <h2>Our Vision</h2>
                    <p>At Muruga Kitchen, we believe nobody should go hungry. Our platform bridges the gap between generous donors and those in need, powered by our dedicated delivery heroes.</p>
                </div>
            </section>

            {/* NEW: Guiding Spirits of Service */}
            <section className="icons-section">
                <div className="section-header">
                    <h2>Guiding Spirits of Service</h2>
                    <p>Inspiration from India's greatest humanitarian legends.</p>
                </div>
                <div className="section-container">
                    <div className="feature-card icon-bio-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#F0FDF4' }}>🕊️</div>
                        <h3>Mother Teresa</h3>
                        <p className="bio-text">The Saint of the Gutters. Lived in Kolkata, founded Missionaries of Charity to serve the poorest of the poor with unconditional love.</p>
                    </div>
                    <div className="feature-card icon-bio-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#FDF2F8' }}>👩‍🏫</div>
                        <h3>Savitribai Phule</h3>
                        <p className="bio-text">Mother of Indian Feminism. India's first female teacher who opened doors of education for the marginalized and fought for social justice.</p>
                    </div>
                    <div className="feature-card icon-bio-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#FFF7ED' }}>👵</div>
                        <h3>Avvaiyar</h3>
                        <p className="bio-text">Legendary Tamil Sage. A wandering poetess who traveled across villages, promoting kindness, hunger-relief, and ethical living.</p>
                    </div>
                    <div className="feature-card icon-bio-card">
                        <div className="feature-img-placeholder" style={{ backgroundColor: '#EEF2FF' }}>🍲</div>
                        <h3>Ahilyabai Holkar</h3>
                        <p className="bio-text">The Philosopher Queen. Ruler of Indore who established numerous free food kitchens (Annachhatras) and shelters across India.</p>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="impact-section">
                <div className="section-header">
                    <h2>Making a Difference</h2>
                    <p>Track the growth of our mission as we serve the community with pride.</p>
                </div>
                <div className="impact-grid">
                    <div className="impact-card">
                        <span className="impact-num">10k+</span>
                        <span className="impact-label">Meals Shared</span>
                    </div>
                    <div className="impact-card">
                        <span className="impact-num">500+</span>
                        <span className="impact-label">Donors Involved</span>
                    </div>
                    <div className="impact-card">
                        <span className="impact-num">50+</span>
                        <span className="impact-label">Active Heroes</span>
                    </div>
                </div>
            </section>

            {/* RESTORED: The Golden Path Roadmap (Hand-Drawn Style) */}
            <section className="golden-roadmap-section">
                <div className="section-header">
                    <h2>Muruga's Vision Quest</h2>
                    <p>A hand-drawn journey of love, serving those who need it most.</p>
                </div>

                <div className="drawing-container">
                    {/* SVG Dotted Line Connecting Milestones */}
                    <svg className="roadmap-svg" viewBox="0 0 800 600" fill="none">
                        <path
                            d="M100,500 C150,450 250,550 300,400 C350,250 450,350 500,200 C550,50 700,150 750,50"
                            stroke="#427D9D"
                            strokeWidth="4"
                            strokeDasharray="10 10"
                            className="path-animation"
                        />
                    </svg>

                    <div className="milestone-rock" style={{ bottom: '5%', left: '10%' }}>
                        <div className="rock-icon">🏗️</div>
                        <div className="rock-text">
                            <h4>Startup</h4>
                            <p>Launching our food donation mission.</p>
                        </div>
                    </div>

                    <div className="milestone-rock" style={{ bottom: '35%', left: '35%' }}>
                        <div className="rock-icon">🤝</div>
                        <div className="rock-text">
                            <h4>Partnerships</h4>
                            <p>Bridging food to places of need.</p>
                        </div>
                    </div>

                    <div className="milestone-rock" style={{ bottom: '55%', left: '55%' }}>
                        <div className="rock-icon">🏘️</div>
                        <div className="rock-text">
                            <h4>Orphanages</h4>
                            <p>Daily meals for children.</p>
                        </div>
                    </div>

                    <div className="milestone-rock pulse" style={{ top: '8%', right: '8%' }}>
                        <div className="rock-icon">❤️</div>
                        <div className="rock-text">
                            <h4>Zero Hunger</h4>
                            <p>Our final mission of love.</p>
                        </div>
                    </div>
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
                            <p className="footer-tagline">Serving love through every bowl.</p>
                            <div className="social-links">
                                <a href="https://instagram.com/murugakitchen" target="_blank" rel="noopener noreferrer">Instagram</a>
                                <a href="https://twitter.com/murugakitchen" target="_blank" rel="noopener noreferrer">Twitter</a>
                                <a href="https://facebook.com/murugakitchen" target="_blank" rel="noopener noreferrer">Facebook</a>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="https://about.murugakitchen.com" target="_blank" rel="noopener noreferrer">About Us</a></li>
                                <li><Link to="/">Manifesto</Link></li>
                                <li><a href="https://careers.murugakitchen.com" target="_blank" rel="noopener noreferrer">Careers</a></li>
                                <li><a href="https://blog.murugakitchen.com" target="_blank" rel="noopener noreferrer">Kitchen Blog</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Contact us</h4>
                            <ul>
                                <li><a href="https://support.murugakitchen.com" target="_blank" rel="noopener noreferrer">Help & Support</a></li>
                                <li><Link to="/signup">Partner with us</Link></li>
                                <li><Link to="/signup">Ride with us</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="https://legal.murugakitchen.com/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a></li>
                                <li><a href="https://legal.murugakitchen.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                                <li><a href="https://legal.murugakitchen.com/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p className="copyright">© 2026 Muruga Kitchen Technologies Pvt. Ltd. Grounded in Bangalore.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
