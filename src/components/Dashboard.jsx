import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOrphanage } = useAuth();
  const [stats, setStats] = useState({ needs: '0', heroes: '0', orphanages: '0' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({ needs: '10,247', heroes: '523', orphanages: '54' });
      setLoading(false);
    }, 800);
  }, []);

  const features = [
    { icon: '🤝', title: 'Direct Connection', desc: 'Connect directly with verified organizations in need.' },
    { icon: '🎯', title: 'Real Impact', desc: 'See exactly where your contribution makes a difference.' },
    { icon: '🏅', title: 'Recognition', desc: 'Join our community of changemakers and heroes.' },
  ];

  const statsDisplay = [
    { value: stats.needs, label: 'Lives Touched', icon: '❤' },
    { value: stats.heroes, label: 'Active Donors', icon: '🌟' },
    { value: stats.orphanages, label: 'Partner Organizations', icon: '🏛' },
  ];

  return (
    <div className="dashboard">
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Verified Organizations</span>
          <h1>Every contribution creates hope</h1>
          <p>Connect surplus resources with communities in need. Transparent, verified, and impactful giving.</p>
          <div className="hero-cta">
            {isOrphanage ? (
              <button className="btn-primary hero-btn" onClick={() => navigate('/create')}>Post a Need</button>
            ) : (
              <button className="btn-primary hero-btn" onClick={() => navigate('/donations')}>Explore Needs</button>
            )}
            {!isAuthenticated && (
              <button className="btn-secondary hero-btn" onClick={() => navigate('/signup')}>Get Started</button>
            )}
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="section-inner">
          <h2>How It Works</h2>
          <p className="journey-subtitle">Simple, transparent, and impactful</p>
          <div className="sketch-flow">
            <div className="journey-steps">
              <div className="journey-step">
                <div className="journey-step-number">1</div>
                <h3>Organizations Post</h3>
                <p>Verified organizations share their specific needs with complete transparency</p>
              </div>
              <div className="journey-step">
                <div className="journey-step-number">2</div>
                <h3>Donors Discover</h3>
                <p>Browse verified needs with location, details, and real-time progress tracking</p>
              </div>
              <div className="journey-step">
                <div className="journey-step-number">3</div>
                <h3>Direct Delivery</h3>
                <p>Contribute directly to organizations with complete visibility and tracking</p>
              </div>
              <div className="journey-step">
                <div className="journey-step-number">4</div>
                <h3>Impact Shared</h3>
                <p>Receive updates and see the real difference your contribution made</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-inner">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="section-inner">
          <div className="stats-grid">
            {statsDisplay.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">{loading ? '...' : s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="section-inner mission-inner">
          <h2>Our Mission</h2>
          <p>"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</p>
          <p style={{ marginTop: '1rem', fontSize: '1rem' }}>We bridge the gap between abundance and need, creating a transparent platform where every contribution makes a measurable difference in someone's life.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>Hopeful Hands</strong>
            <span>Connecting generosity with genuine need</span>
          </div>
          <div className="footer-links">
            <Link to="/donations">Browse Needs</Link>
            <Link to="/signup">Join Us</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Hopeful Hands. Building bridges of compassion.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
