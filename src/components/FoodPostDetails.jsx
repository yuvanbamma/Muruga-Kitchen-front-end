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
                        <p className="cuisine-type">{post.requirement ? 'Orphanage Support • Goverment Authorized • Urgent' : 'Mission Need'}</p>
                        <div className="meta-stats">
                            <span className="rating-pill">
                                <span className="star">★</span> Mission
                            </span>
                            <span className="meta-dot">•</span>
                            <span>Needed by: {post.expireTime ? new Date(post.expireTime).toLocaleDateString() : 'ASAP'}</span>
                            <span className="meta-dot">•</span>
                            <span>Goal: {post.quantityRequired || 0} Servings</span>
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
                        <h3>Requirement Details</h3>
                        <p>{post.requirement || post.description || 'No specific details provided.'}</p>

                        <div className="mission-fulfillment-tracker">
                            <div className="tracker-header">
                                <h3>Fulfillment Progress</h3>
                                <span className="progress-percent">
                                    {Math.min(100, Math.round((post.collectedQuantity || 0) / (post.quantityRequired || 1) * 100))}%
                                </span>
                            </div>
                            <div className="detailed-progress-bar">
                                <div
                                    className="detailed-progress-fill"
                                    style={{ width: `${Math.min(100, (post.collectedQuantity || 0) / (post.quantityRequired || 1) * 100)}%` }}
                                ></div>
                            </div>
                            <p className="tracker-footer">
                                <strong>{post.collectedQuantity || 0}</strong> servings collected out of <strong>{post.quantityRequired || 0}</strong> needed.
                            </p>
                        </div>
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
                            <button className="primary-btn-lg">Fulfill Requirement</button>
                            <button className="secondary-btn-lg">Connect with Orphanage</button>
                        </div>

                        {/* Management Actions */}
                        <div className="management-actions-detail">
                            <p className="mgmt-label">Orphanage Tools</p>
                            <div className="mgmt-buttons">
                                <button className="mgmt-btn edit" onClick={() => setIsEditing(true)}>Edit Requirement</button>
                                <button className="mgmt-btn delete" onClick={handleDelete}>Remove Post</button>
                            </div>
                        </div>

                        <p className="safety-note">Mission Hero honors will be awarded upon completion.</p>
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
