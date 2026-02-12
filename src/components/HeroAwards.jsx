import { useAuth } from '../context/AuthContext';
import './HeroAwards.css';

const HeroAwards = () => {
  const { user, isHero } = useAuth();

  const awards = [
    { id: '1', title: 'Sustenance Guardian', criteria: 'Fulfilled 5 requirements', date: '2026-03-15', icon: '🛡' },
    { id: '2', title: 'Childhood Dreamer', criteria: 'Fulfilled a birthday need', date: '2026-04-02', icon: '🎈' },
  ];

  if (!isHero) {
    return (
      <div className="awards-unauth">
        <h1>Hero only</h1>
        <p>Sign up as a Mission Hero to earn awards and access the Hall of Honor.</p>
      </div>
    );
  }

  return (
    <div className="awards-page">
      <header className="awards-header">
        <div className="awards-profile">
          <div className="awards-avatar">{user?.name?.charAt(0) || user?.email?.charAt(0) || 'H'}</div>
          <div>
            <h1>{user?.name || user?.email}'s Sanctuary</h1>
            <span className="awards-rank">Master Guardian</span>
          </div>
        </div>
        <div className="awards-stats">
          <span><strong>12</strong> lives impacted</span>
          <span><strong>450</strong> servings</span>
        </div>
      </header>
      <section className="awards-list">
        <h2>Your medals</h2>
        <div className="awards-grid">
          {awards.map(a => (
            <div key={a.id} className="award-card">
              <span className="award-icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.criteria}</p>
              <span className="award-date">{new Date(a.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="awards-share">
        <h3>Your legacy page</h3>
        <div className="share-link">
          <code>murugakitchen.com/hero/{user?.name?.toLowerCase().replace(/\s+/g, '-') || 'you'}</code>
          <button className="btn-secondary btn-sm">Copy</button>
        </div>
      </section>
    </div>
  );
};

export default HeroAwards;
