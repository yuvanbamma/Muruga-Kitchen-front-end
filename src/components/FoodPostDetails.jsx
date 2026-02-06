import { useState, useEffect } from 'react';
import api from '../utils/api';
import './FoodPostDetails.css';
import EditFoodModal from './EditFoodModal';

const FoodPostDetails = ({ postId, onBack }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await api.delete(`/food-posts?id=${postId}`);
            onBack(); // Auto-refresh by going back to the list
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.message || "Failed to delete item.");
        }
    };

    const handleUpdateComplete = (updatedPost) => {
        setPost(updatedPost);
        setIsEditing(false);
    };

    if (loading) return <div className="details-page loading">Loading refined flavors...</div>;
    if (error) return <div className="details-page error">Error: {error}</div>;
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

                        {/* Management Actions */}
                        <div className="management-actions-detail">
                            <p className="mgmt-label">Owner Tools</p>
                            <div className="mgmt-buttons">
                                <button className="mgmt-btn edit" onClick={() => setIsEditing(true)}>Edit Dish</button>
                                <button className="mgmt-btn delete" onClick={handleDelete}>Delete Dish</button>
                            </div>
                        </div>

                        <p className="safety-note">Safe & Hygienic | No Contact Delivery</p>
                    </div>
                </div>
            </div>

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
