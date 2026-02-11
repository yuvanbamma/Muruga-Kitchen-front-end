import React from 'react';
import { useAuth } from '../context/AuthContext';
import './HeroAwards.css';

const HeroAwards = () => {
    const { user, isHero } = useAuth();

    // Mock awards for demonstration
    const awards = [
        {
            id: 'award-1',
            title: 'Sustenance Guardian',
            criteria: 'Fulfilled 5 orphanage requirements',
            issuedDate: '2026-03-15',
            icon: '🛡️',
            rarity: 'Legendary'
        },
        {
            id: 'award-2',
            title: 'Childhood Dreamer',
            criteria: 'Fulfilled a birthday requirement',
            issuedDate: '2026-04-02',
            icon: '🎈',
            rarity: 'Epic'
        }
    ];

    if (!isHero) {
        return (
            <div className="hero-awards-container unauthorized">
                <div className="unauth-content">
                    <h1>Hero Status Required</h1>
                    <p>Only registered Mission Heroes can access the Hall of Honor. Step up to serve and earn your place here.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="hero-awards-container">
            <header className="awards-header">
                <div className="hero-profile-snippet">
                    <div className="hero-avatar">{user?.name?.charAt(0) || 'H'}</div>
                    <div className="hero-info">
                        <h1>{user?.name}'s Sanctuary</h1>
                        <p className="hero-rank">Rank: Master Guardian • Level 12</p>
                    </div>
                </div>
                <div className="header-stats">
                    <div className="stat-pill"><strong>12</strong> Lives Impacted</div>
                    <div className="stat-pill"><strong>450</strong> Servings Shared</div>
                </div>
            </header>

            <section className="awards-showcase">
                <h2 className="section-title">Your Honor Medals</h2>
                <div className="awards-grid">
                    {awards.map(award => (
                        <div key={award.id} className={`award-card ${award.rarity.toLowerCase()}`}>
                            <div className="award-icon">{award.icon}</div>
                            <div className="award-details">
                                <span className="rarity-badge">{award.rarity}</span>
                                <h3>{award.title}</h3>
                                <p>{award.criteria}</p>
                                <span className="issue-date">Issued on {new Date(award.issuedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="award-actions">
                                <button className="share-btn">Share to Story</button>
                                <button className="cert-btn">View Certificate</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="public-profile-link">
                <div className="profile-link-card">
                    <h3>Your Legacy Page</h3>
                    <p>This public link showcases your contributions to the world. Share it in your bio.</p>
                    <div className="link-copy-box">
                        <code>murugakitchen.com/hero/{user?.name?.toLowerCase().replace(/\s+/g, '-')}</code>
                        <button className="copy-btn">Copy Link</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroAwards;
