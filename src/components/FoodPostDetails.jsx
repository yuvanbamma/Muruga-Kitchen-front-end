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
                <span onClick={onBack} className="back-link">Home</span>
                <span className="separator">/</span>
                <span className="current-crumb">{post.name}</span>
            </div>

            <div className="details-main-grid">

                {/* Left Column: Hero & Info */}
                <div className="details-content">
                    <div className="info-header">
                        <h1>{post.name}</h1>
                        <p className="cuisine-type">{post.description ? 'Indian • Traditional • Homemade' : 'Fast Food'}</p>
                        <div className="meta-stats">
                            <span className="rating-pill">
                                <span className="star">★</span> 4.5
                            </span>
                            <span className="meta-dot">•</span>
                            <span>35 mins</span>
                            <span className="meta-dot">•</span>
                            <span>₹{(post.quantity || 1) * 150} for two</span>
                        </div>
                    </div>

                    <div className="hero-banner">
                        <img
                            src={post.imageUrl ? (post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.VITE_API_URL}${post.imageUrl}`) : 'https://placehold.co/800x400?text=Food+Delight'}
                            alt={post.name}
                            className="hero-img"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/800x400?text=Food+Delight';
                            }}
                        />
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
                    </div>
                </div>

                {/* Right Column: Order Action */}
                <div className="order-sidebar">
                    <div className="order-card">
                        <div className="price-row">
                            <h2>Total</h2>
                            <span className="final-price">Free / Donation</span>
                        </div>

                        <div className="action-buttons">
                            <button className="primary-btn-lg">Request Item</button>
                            <button className="secondary-btn-lg">Contact</button>
                        </div>
                        <p className="safety-note">Safe & Hygienic | No Contact Delivery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodPostDetails;
