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
                <div className="hero-floating-elements">
                    <div className="floating-item item-1">🙏</div>
                    <div className="floating-item item-2">🍲</div>
                    <div className="floating-item item-3">🎁</div>
                    <div className="floating-item item-4">❤️</div>
                    <div className="floating-item item-5">🕊️</div>
                    <div className="floating-item item-6">✨</div>
                </div>

                <div className="hero-content">
                    <div className="hero-badge fade-in">🙏 Serving Humanity Through Your Generosity</div>
                    <h1 className="hero-title fade-in">Share Surplus, <br /><span>Feed Every Soul</span></h1>
                    <p className="hero-subtitle slide-up">Don't let good food go to waste. Connect surplus from weddings and events directly to orphanages and those in need.</p>

                    <div className="hero-actions slide-up delay-1">
                        {isDonor ? (
                            <button
                                className="cta-button primary-gradient"
                                onClick={() => navigate('/create')}
                            >
                                Post Surplus Food
                            </button>
                        ) : isDeliveryBoy ? (
                            <button
                                className="cta-button primary-gradient"
                                onClick={() => navigate('/donations')}
                            >
                                Start Delivering Love
                            </button>
                        ) : (
                            <button
                                className="cta-button primary-gradient"
                                onClick={() => navigate('/donations')}
                            >
                                View Available Food
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
                        <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <h3>Event Surplus</h3>
                        <p>Perfectly safe, untouched food from weddings and parties redirected to those who need it.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <h3>Orphanage Support</h3>
                        <p>Dedicated portal for orphanages to host their needs and receive daily nutritious meals.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3>Mission Heroes</h3>
                        <p>Our delivery partners aren't just workers; they're heroes bridging the gap between waste and hunger.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        </div>
                        <h3>Zero Waste</h3>
                        <p className="poem-text">"If even a single person has no food, we shall destroy this world."</p>
                    </div>
                </div>
            </section>

            {/* How It Works - Pencil Sketch Diagram Section */}
            <section className="sketchbook-section">
                <div className="section-header">
                    <h2>Our Mission Flow</h2>
                    <p>A simple, hand-drawn look at how your kindness moves through the world.</p>
                </div>
                <div className="sketch-container">
                    <svg className="pencil-sketch-svg" viewBox="0 0 900 400">
                        <defs>
                            <filter id="master-charcoal">
                                <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="6" result="noise" />
                                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
                                <feGaussianBlur stdDeviation="0.3" />
                            </filter>
                            <pattern id="master-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                                <line x1="0" y1="0" x2="0" y2="4" stroke="#444" strokeWidth="0.2" opacity="0.4" />
                            </pattern>
                        </defs>

                        {/* --- Node 1: Communal Hall (Master Sketch) --- */}
                        <g transform="translate(150, 200)">
                            {/* Pentimenti (Construction Lines) */}
                            <path d="M-60,40 L60,40 M0,-60 L0,40 M-60,-20 L60,-20" className="pentimenti" />
                            <circle cx="0" cy="-30" r="40" className="pentimenti" />

                            {/* Master Hatching */}
                            <path d="M-50,30 L50,30 L50,-10 L-50,-10 Z" fill="url(#master-hatch)" />

                            {/* Layered Charcoal Strokes */}
                            <g className="charcoal-layers">
                                <path d="M-45,25 L45,25 L45,-5 L-45,-5 Z" className="charcoal-master" />
                                <path d="M-46,26 L44,24 L45,-6 L-44,-4 Z" className="charcoal-smudge" />
                                {/* Roof */}
                                <path d="M-50,-5 L0,-40 L50,-5" className="charcoal-master" />
                                <path d="M-52,-6 L0,-42 L52,-4" className="charcoal-smudge" />
                                {/* Detail Pillars */}
                                <path d="M-30,-5 L-30,25 M-10,-5 L-10,25 M10,-5 L10,25 M30,-5 L30,25" className="charcoal-master" strokeWidth="1" />
                            </g>
                            <text x="0" y="65" className="sketch-label">The Surplus Source</text>
                        </g>

                        {/* Journey Arrow 1 */}
                        <g transform="translate(230, 200)">
                            <path d="M0,-10 C40,-30 100,10 160,-10" className="charcoal-smudge" strokeDasharray="5 5" />
                            <path d="M10,-5 C50,-25 110,15 170,-5" className="charcoal-master" strokeWidth="1.2" />
                            <path d="M155,-15 L170,-5 L155,5" className="charcoal-master" />
                        </g>

                        {/* --- Node 2: Mission Hero on Bicycle (Master Sketch) --- */}
                        <g transform="translate(450, 200)">
                            {/* Pentimenti */}
                            <circle cx="-25" cy="20" r="30" className="pentimenti" />
                            <circle cx="25" cy="20" r="30" className="pentimenti" />
                            <path d="M-40,20 L40,-10 M0,0 L20,-40" className="pentimenti" />

                            {/* Master Hatching */}
                            <circle cx="0" cy="0" r="35" fill="url(#master-hatch)" />

                            {/* Layered Strokes */}
                            <g className="charcoal-layers">
                                <circle cx="-25" cy="25" r="20" className="charcoal-master" />
                                <circle cx="-26" cy="24" r="20" className="charcoal-smudge" />
                                <circle cx="25" cy="25" r="20" className="charcoal-master" />
                                <circle cx="24" cy="26" r="20" className="charcoal-smudge" />

                                <path d="M-25,25 L0,-15 L25,25 M0,-15 L-15,-35 M-25,-35 L-5,-35" className="charcoal-master" />
                                <path d="M-2,-15 Q10,-40 25,-20" className="charcoal-master" strokeWidth="2.5" /> {/* Hero Gesture */}
                            </g>
                            <text x="0" y="75" className="sketch-label">The Hero's Devotion</text>
                        </g>

                        {/* Journey Arrow 2 */}
                        <g transform="translate(530, 200)">
                            <path d="M0,10 C40,30 100,-10 160,10" className="charcoal-smudge" strokeDasharray="5 5" />
                            <path d="M10,15 C50,35 110,-5 170,15" className="charcoal-master" strokeWidth="1.2" />
                            <path d="M155,5 L170,15 L155,25" className="charcoal-master" />
                        </g>

                        {/* --- Node 3: Community Home (Master Sketch) --- */}
                        <g transform="translate(750, 200)">
                            {/* Pentimenti */}
                            <path d="M-60,40 L60,40 M0,-60 L0,40" className="pentimenti" />
                            <circle cx="0" cy="-20" r="50" className="pentimenti" />

                            {/* Master Hatching */}
                            <path d="M-40,30 L40,30 L40,-5 L0,-35 L-40,-5 Z" fill="url(#master-hatch)" />

                            {/* Layered Strokes */}
                            <g className="charcoal-layers">
                                <path d="M-40,30 L40,30 L40,-5 L0,-35 L-40,-5 Z" className="charcoal-master" />
                                <path d="M-38,32 L42,28 L39,-7 L0,-37 L-41,-3 Z" className="charcoal-smudge" />
                                <path d="M-10,30 L-10,10 L10,10 L10,30" className="charcoal-master" />
                                {/* Narrative Detailing */}
                                <path d="M45,-20 Q55,-40 65,-25" className="charcoal-smudge" strokeWidth="0.8" /> {/* Smoke */}
                                <path d="M50,-15 Q60,-30 70,-18" className="charcoal-smudge" strokeWidth="0.6" />
                            </g>
                            <text x="0" y="75" className="sketch-label">Love Shared</text>
                        </g>
                    </svg>

                    <div className="sketch-text-overlay">
                        <div className="sketch-step">1. Food Shared</div>
                        <div className="sketch-step">2. Hero Connects</div>
                        <div className="sketch-step">3. Hunger Solved</div>
                    </div>
                </div>
            </section>

            {/* Professional Vision Section */}
            <section className="mission-highlight">
                <div className="mission-content">
                    <h2>Our Non-Profit Vision</h2>
                    <p>At Muruga Kitchen, we believe that in a world of abundance, hunger is a choice we make as a society. Our mission is to ensure no ceremony ends with waste while a child nearby goes to bed hungry.</p>
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
                    <h2>Mission in your pocket</h2>
                    <p>Track food donations & delivery status on the go, with the all-new Muruga Kitchen Mission app.</p>
                    <div className="store-buttons">
                        <button className="store-btn google-play">Get on Play Store</button>
                        <button className="store-btn app-store">Get on App Store</button>
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
