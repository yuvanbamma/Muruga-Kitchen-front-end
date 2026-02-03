import { useState, useEffect } from 'react';
import './FoodPostDetails.css';

const FoodPostDetails = ({ postId, onBack }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!postId) return;

        const fetchPostDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-posts/${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post details');
                }
                const data = await response.json();
                setPost(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (loading) return (
        <div className="details-loader">
            <div className="spinner"></div>
            <p>Loading deliciousness...</p>
        </div>
    );

    if (error) return (
        <div className="details-error">
            <h2>Oops!</h2>
            <p>{error}</p>
            <button onClick={onBack} className="back-link">Go Back</button>
        </div>
    );

    if (!post) return null;

    return (
        <div className="details-page">
            {/* Breadcrumb / Back */}
            <div className="breadcrumb-bar">
                <span onClick={onBack} className="back-link">← Back to Feed</span>
                <span className="separator">/</span>
                <span className="current-crumb">{post.name}</span>
            </div>

            <div className="details-main-grid">

                {/* Left Column: Visuals & Info */}
                <div className="details-content">
                    <div className="hero-banner">
                        <img
                            src={post.imageUrl || 'https://placehold.co/800x400?text=Food+Delight'}
                            alt={post.name}
                            className="hero-img"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/800x400?text=Food+Delight';
                            }}
                        />
                        <div className="hero-badges">
                            {post.quantity > 0 ? (
                                <span className="status-badge available">Available Now</span>
                            ) : (
                                <span className="status-badge sold-out">Sold Out</span>
                            )}
                        </div>
                    </div>

                    <div className="info-header">
                        <h1>{post.name}</h1>
                        <p className="cuisine-type">{post.description ? 'Indian • Traditional' : 'Fast Food'}</p>
                        <div className="meta-stats">
                            <span className="rating-pill">★ 4.5 (50+)</span>
                            <span className="meta-dot">•</span>
                            <span>35 mins delivery</span>
                            <span className="meta-dot">•</span>
                            <span>Freshly Prepared</span>
                        </div>
                    </div>

                    <div className="description-box">
                        <h3>About this item</h3>
                        <p>{post.description || 'No description provided for this delicious item.'}</p>
                    </div>

                    {/* Placeholder Reviews */}
                    <div className="reviews-section">
                        <h3>Reviews</h3>
                        <div className="review-card">
                            <div className="reviewer-avatar">A</div>
                            <div className="review-text">
                                <strong>Aditi R.</strong>
                                <p>"Absolutely loved the taste! Highly recommended."</p>
                            </div>
                        </div>
                        <div className="review-card">
                            <div className="reviewer-avatar">R</div>
                            <div className="review-text">
                                <strong>Rahul K.</strong>
                                <p>"Authentic flavor, just like home made."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Cart (Sticky) */}
                <div className="order-sidebar">
                    <div className="order-card">
                        <div className="price-row">
                            <h2>Order</h2>
                            <span className="final-price">Free / Donation</span>
                        </div>

                        <div className="order-info-list">
                            <div className="order-line">
                                <span>Quantity Available</span>
                                <strong>{post.quantity} packs</strong>
                            </div>
                            <div className="order-line">
                                <span>Delivery Fee</span>
                                <strong>₹40</strong>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className="primary-btn-lg">Request Item</button>
                            <button className="secondary-btn-lg">Contact Donor</button>
                        </div>

                        <p className="safety-note">🛡️ 100% Safe & Hygienic</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPostDetails;
