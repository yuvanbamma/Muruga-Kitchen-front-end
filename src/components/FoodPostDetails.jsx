import { useState, useEffect } from 'react';
import api from '../utils/api';
import './FoodPostDetails.css';
import EditFoodModal from './EditFoodModal';
import { useAuth } from '../context/AuthContext';

const FoodPostDetails = ({ postId, onBack }) => {
    const { user, isOrphanage } = useAuth();
    const [post, setPost] = useState(null);
    const [orphanageDetails, setOrphanageDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showContact, setShowContact] = useState(false);

    const [orphanageLoading, setOrphanageLoading] = useState(false);

    useEffect(() => {
        if (!postId) return;
        const fetchPostDetails = async () => {
            setLoading(true);
            try {
                const data = await api.get(`/food-posts/${postId}`);
                setPost(data);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Details error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPostDetails();
    }, [postId]);

    const fetchContactDetails = async () => {
        if (!post?.orphaneId) return;
        setOrphanageLoading(true);
        try {
            // 1. Fetch Orphanage Details first
            const orgData = await api.get(`/orphanage?orphanageId=${post.orphaneId}`);

            // 2. Use userIdentity from orphanage to fetch User details
            let userData = { email: 'N/A', phoneNumber: 'N/A' };
            if (orgData.userIdentity) {
                try {
                    userData = await api.get(`/users?userId=${orgData.userIdentity}`);
                } catch (userErr) {
                    console.error("User fetch error:", userErr);
                }
            }

            // Combine data for display
            setOrphanageDetails({
                ...orgData,
                userEmail: userData.email,
                userPhone: userData.phoneNumber,
                userCountry: userData.country
            });
            setShowContact(true);
        } catch (err) {
            console.error("Contact fetch error:", err);
            alert("Unable to fetch complete contact details.");
        } finally {
            setOrphanageLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await api.delete(`/food-posts?id=${postId}`);
            onBack();
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.message || "Failed to delete item.");
        }
    };

    const handleUpdateComplete = (updatedPost) => {
        setPost(updatedPost);
        setIsEditing(false);
    };

    if (loading) return (
        <div className="details-loader">
            <div className="loader-spinner"></div>
            <p>Gathering mission details...</p>
        </div>
    );

    if (error) return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Unable to load mission</h2>
            <p>{error}</p>
            <button onClick={onBack} className="secondary-btn">Go Back</button>
        </div>
    );

    if (!post) return null;

    const progress = Math.min(100, Math.round((post.collectedQuantity || 0) / (post.quantityRequired || 1) * 100));

    // Simplified Owner Check: Direct ID comparison only
    const isOwner = user?.userId === post.userId;

    return (
        <div className="details-page-premium">
            {/* Global Backdrop Blur */}
            <div className="backdrop-blur"></div>

            {/* Navigation Header */}
            <div className="details-nav">
                <button onClick={onBack} className="nav-back-btn">
                    <span className="icon">←</span> Back to Missions
                </button>
                <div className="nav-actions">
                    <button className="share-btn-icon" title="Share Mission">🔗</button>
                </div>
            </div>

            <div className="details-container">
                {/* Left Column: Visuals & Key Stats */}
                <div className="details-left">
                    <div className="image-gallery-card">
                        <img
                            src={post.imageUrl ? (post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.VITE_API_URL}${post.imageUrl}`) : 'https://placehold.co/800x600?text=Mission+Visual'}
                            alt={post.name}
                            className="main-hero-image"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/800x600?text=Mission+Visual';
                            }}
                        />
                        <div className="image-overlay-gradient"></div>
                        <div className="status-badges">
                            <span className="badge urgent">Urgent Need</span>
                            <span className="badge verified">Verified Orphanage</span>
                        </div>
                    </div>

                    <div className="quick-stats-grid">
                        <div className="stat-box">
                            <span className="stat-label">Goal</span>
                            <span className="stat-value">{post.quantityRequired || 0}</span>
                            <span className="stat-unit">Servings</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Collected</span>
                            <span className="stat-value">{post.collectedQuantity || 0}</span>
                            <span className="stat-unit">Servings</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Deadline</span>
                            <span className="stat-value highlight">{post.expireTime ? new Date(post.expireTime).toLocaleDateString() : 'ASAP'}</span>
                            <span className="stat-unit">Date</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative & Action */}
                <div className="details-right">
                    <div className="content-wrapper">
                        <h1 className="mission-title">{post.name}</h1>

                        <div className="organization-mini-card">
                            <div className="org-avatar">{orphanageDetails?.officialName?.charAt(0) || 'O'}</div>
                            <div className="org-info">
                                <h3>{orphanageDetails?.officialName || 'Orphanage Request'}</h3>
                                <p>{orphanageDetails?.landmark || 'Verified Organization'}</p>
                            </div>
                        </div>

                        <div className="description-section">
                            <h3>About the Mission</h3>
                            <p className="mission-text">
                                {post.requirement || post.description || 'This orphanage needs your support to provide healthy meals for children. Your contribution makes a direct impact.'}
                            </p>
                        </div>

                        <div className="progress-section">
                            <div className="progress-header">
                                <span>Mission Progress</span>
                                <strong>{progress}%</strong>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill-animated" style={{ width: `${progress}%` }}></div>
                            </div>
                            <p className="impact-note">
                                <span className="heart-icon">❤️</span> Only <strong>{(post.quantityRequired || 0) - (post.collectedQuantity || 0)}</strong> more servings needed to complete this goal.
                            </p>
                        </div>

                        <div className="action-dock">
                            {isOwner ? (
                                <div className="owner-controls">
                                    <button className="action-btn secondary" onClick={() => setIsEditing(true)}>Edit Mission</button>
                                    <button className="action-btn danger" onClick={handleDelete}>Delete</button>
                                </div>
                            ) : (
                                <div className="donor-controls">
                                    <button
                                        className="action-btn primary"
                                        onClick={fetchContactDetails}
                                        disabled={orphanageLoading}
                                    >
                                        {orphanageLoading ? 'Connecting...' : 'Connect & Donate'}
                                    </button>
                                    <p className="trust-note">Directly contacts the orphanage admin</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Contact Modal */}
            {showContact && orphanageDetails && (
                <div className="modal-overlay reveal">
                    <div className="modal-card premium-contact-modal">
                        <div className="modal-top-bar">
                            <span className="mission-tag">Connect with Organization</span>
                            <button className="close-btn-minimal" onClick={() => setShowContact(false)}>×</button>
                        </div>

                        <div className="modal-header-hero">
                            <div className="hero-content">
                                <div className="org-avatar-xl">
                                    {orphanageDetails.officialName?.charAt(0) || 'O'}
                                    <div className="online-indicator"></div>
                                </div>
                                <div className="header-text-main">
                                    <h2>{orphanageDetails.officialName}</h2>
                                    <div className="trust-badges">
                                        <span className="trust-pill verified">
                                            <i className="check-icon">✓</i> Government Verified
                                        </span>
                                        {orphanageDetails.registeredNumber && (
                                            <span className="trust-pill reg">#{orphanageDetails.registeredNumber}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body-scrollable">
                            <div className="contact-info-grid">
                                <div className="info-tile">
                                    <div className="tile-icon phone">📞</div>
                                    <div className="tile-content">
                                        <label>Direct Contact</label>
                                        <a href={`tel:${orphanageDetails.userPhone}`} className="tile-value highlight">
                                            {orphanageDetails.userPhone || orphanageDetails.contactPersonContact || 'N/A'}
                                        </a>
                                    </div>
                                </div>

                                <div className="info-tile">
                                    <div className="tile-icon email">✉️</div>
                                    <div className="tile-content">
                                        <label>Official Email</label>
                                        <a href={`mailto:${orphanageDetails.userEmail}`} className="tile-value">
                                            {orphanageDetails.userEmail || orphanageDetails.email || 'N/A'}
                                        </a>
                                    </div>
                                </div>

                                <div className="info-tile full-width">
                                    <div className="tile-icon location">📍</div>
                                    <div className="tile-content">
                                        <label>Reach us at</label>
                                        <p className="tile-value address">
                                            {orphanageDetails.fullAddress}
                                            {orphanageDetails.landmark && (
                                                <span className="landmark-tag">
                                                    Near {orphanageDetails.landmark}
                                                </span>
                                            )}
                                        </p>
                                        <span className="location-context">{orphanageDetails.userCountry || 'India'}</span>
                                    </div>
                                </div>

                                {orphanageDetails.bio && (
                                    <div className="info-tile full-width bio-tile">
                                        <div className="tile-content">
                                            <label>Organization Story</label>
                                            <p className="bio-desc">{orphanageDetails.bio}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer-actions">
                            <button className="glow-btn primary" onClick={() => window.open(`tel:${orphanageDetails.userPhone || orphanageDetails.contactPersonContact}`)}>
                                <span className="icon">📞</span> Call Orphanage
                            </button>
                            <button className="minimal-btn" onClick={() => setShowContact(false)}>
                                Back to Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fallback Contact Modal if details missing */}
            {showContact && !orphanageDetails && (
                <div className="modal-overlay reveal">
                    <div className="modal-card">
                        <button className="close-btn" onClick={() => setShowContact(false)}>×</button>
                        <h2>Contact Details Unavailable</h2>
                        <p>We couldn't fetch the specific contact details right now. Please try again later.</p>
                        <button className="secondary-btn-lg" onClick={() => setShowContact(false)}>Close</button>
                    </div>
                </div>
            )}

            {isEditing && (
                <EditFoodModal
                    post={post}
                    onSave={handleUpdateComplete}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default FoodPostDetails;
