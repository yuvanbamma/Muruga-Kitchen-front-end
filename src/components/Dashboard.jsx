import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOrphanage } = useAuth();

  const features = [
    { icon: '🛡', title: 'Verified Orphanages', desc: 'Only authorized organizations can post needs.' },
    { icon: '❤', title: 'Direct Impact', desc: 'Fulfill requirements and help children in need.' },
    { icon: '🏆', title: 'Recognition', desc: 'Get honored in our Hall of Heroes.' },
  ];

  const stats = [
    { value: '10k+', label: 'Needs Fulfilled' },
    { value: '500+', label: 'Heroes' },
    { value: '50+', label: 'Orphanages' },
  ];

  return (
    <div className="dashboard">
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-badge">Authorized orphanages</span>
          <h1>Donate food. Save lives.</h1>
          <p>Orphanages post requirements. Heroes fulfill them. Every contribution counts.</p>
          <div className="hero-cta">
            {isOrphanage ? (
              <button className="btn-primary hero-btn" onClick={() => navigate('/create')}>Post requirement</button>
            ) : (
              <button className="btn-primary hero-btn" onClick={() => navigate('/donations')}>Browse needs</button>
            )}
            {!isAuthenticated && (
              <button className="btn-secondary hero-btn" onClick={() => navigate('/signup')}>Join</button>
            )}
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="section-inner">
          <h2>Mission journey</h2>
          <p className="journey-subtitle">From post to thank-you — a hand-drawn view</p>
          <div className="sketch-flow">
            <svg className="sketch-svg" viewBox="0 0 800 200" aria-hidden="true">
              <defs>
                <filter id="sketch-grain"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1"/></filter>
              </defs>
              <path className="sketch-path" d="M80,100 Q200,60 320,100 T560,100 T720,100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8 6"/>
              <g className="sketch-node" transform="translate(80,100)">
                <rect x="-28" y="-28" width="56" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" filter="url(#sketch-grain)"/>
                <path d="M-12,-8 L0,-18 L12,-8 L8,4 L-8,4 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <text y="50" textAnchor="middle" className="sketch-label">1. Post</text>
              </g>
              <g className="sketch-node" transform="translate(320,100)">
                <rect x="-28" y="-28" width="56" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                <circle cx="0" cy="-4" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M0,2 L0,14 M-6,10 L0,14 L6,10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <text y="50" textAnchor="middle" className="sketch-label">2. See & locate</text>
              </g>
              <g className="sketch-node" transform="translate(560,100)">
                <rect x="-28" y="-28" width="56" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                <path d="M-14,8 L-8,8 L0,0 L8,8 L14,8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="-8" cy="8" r="3" fill="none" stroke="currentColor"/>
                <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor"/>
                <text y="50" textAnchor="middle" className="sketch-label">3. Deliver</text>
              </g>
              <g className="sketch-node" transform="translate(720,100)">
                <rect x="-28" y="-28" width="56" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"/>
                <path d="M-10,-4 L0,-14 L10,-4 L6,8 L-6,8 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M-2,4 L0,10 L2,4" fill="none" stroke="currentColor"/>
                <text y="50" textAnchor="middle" className="sketch-label">4. Thank you</text>
              </g>
            </svg>
            <div className="sketch-steps">
              <span>Orphanage posts food, clothes, anything</span>
              <span>Donors see exact location & details</span>
              <span>Donor delivers</span>
              <span>Orphanage sends thank-you email or small craft</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-inner">
          <h2>How it works</h2>
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
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="section-inner mission-inner">
          <h2>Our mission</h2>
          <p>We connect surplus food with orphanages. No child should go hungry when abundance exists. Join the movement.</p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>Muruga Kitchen</strong>
            <span>Serving love through every meal.</span>
          </div>
          <div className="footer-links">
            <Link to="/donations">Requirements</Link>
            <Link to="/signup">Join</Link>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Muruga Kitchen</p>
      </footer>
    </div>
  );
};

export default Dashboard;
