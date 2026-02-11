import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './FoodPostList.css';
import EditFoodModal from './EditFoodModal';

const FoodPostList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [last, setLast] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Management State
    const [editingPost, setEditingPost] = useState(null);

    const pageSize = 12; // Grid view needs more items

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            // Corrected to POST method as clarified by the user
            const data = await api.post(`/food-posts/getFoodPostList?page=${page}&size=${pageSize}`, {});
            setPosts(data.content);
            setTotalPages(data.totalPages);
            setLast(data.last);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to remove this donation mission?")) return;

        try {
            await api.delete(`/food-posts?id=${id}`);
            fetchPosts();
        } catch (err) {
            console.error("Delete error:", err);
            alert(err.message || "Failed to delete. Please try again.");
        }
    };

    const handleEditClick = (e, post) => {
        e.stopPropagation();
        setEditingPost(post);
    };

    const handleUpdateComplete = (updatedPost) => {
        // Automatically re-fetch to ensure sync with backend
        fetchPosts();
    };

    // Skeleton Loader Component
    const SkeletonCard = () => (
        <div className="food-card skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text title"></div>
            <div className="skeleton-text subtitle"></div>
            <div className="skeleton-meta"></div>
        </div>
    );

    return (
        <div className="feed-container">
            {/* Sticky Filter Bar */}
            <div className="filter-bar">
                <div className="filter-max-width">
                    <button className="filter-chip active">Sort By: Nearest</button>
                    <button className="filter-chip">Vegetarian</button>
                    <button className="filter-chip">Non-Veg</button>
                    <button className="filter-chip">Serves 50+</button>
                    <button className="filter-chip">Ready Now</button>
                </div>
            </div>

            <div className="list-content-area">
                <h2 className="feed-title">{loading ? 'Searching for active needs...' : 'Orphanage Requirements'}</h2>

                {error && <div className="error-message-modern">⚠️ {error}</div>}

                <div className="food-grid-pro">
                    {loading ? (
                        Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        posts.map(post => {
                            const postId = post.id || post.uuid || post.foodPostId || post.postId;
                            const progress = Math.min(100, Math.round((post.collectedQuantity || 0) / (post.quantityRequired || 1) * 100));

                            return (
                                <div
                                    key={postId || Math.random()}
                                    className="food-card-pro orphanage-requirement"
                                    onClick={() => postId && navigate(`/post/${postId}`)}
                                >
                                    <div className="card-media">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.VITE_API_URL}${post.imageUrl}`}
                                                alt={post.name}
                                                className="card-img"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x300?text=Support+Need';
                                                }}
                                            />
                                        ) : (
                                            <div className="no-image-placeholder">🏫</div>
                                        )}

                                        <div className="promoted-badge">Urgent</div>
                                        <div className="time-badge">Goal: {post.quantityRequired || 0}</div>
                                    </div>
                                    <div className="card-details">
                                        <div className="card-header-row">
                                            <h3 className="dish-name">{post.name}</h3>
                                            <div className="rating-badge mission">Mission</div>
                                        </div>

                                        <div className="card-meta-row">
                                            <span className="cuisine-tag">{post.requirement ? post.requirement.substring(0, 45) + '...' : 'Supporting local children...'}</span>
                                        </div>

                                        <div className="mission-progress-container">
                                            <div className="progress-label-row">
                                                <span>{post.collectedQuantity || 0} Collected</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="progress-bar-pro">
                                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="card-divider"></div>

                                        <div className="card-footer-row">
                                            <span className="trend-icon">📍</span>
                                            <span className="trend-text">Connect to Support</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {!loading && posts.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">🙏</div>
                        <h3>No active requirements</h3>
                        <p>All orphanage needs are currently met. You are wonderful!</p>
                    </div>
                )}

                {/* Pagination (Simplified for now) */}
                <div className="pagination-pro">
                    <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="page-btn-pro"
                    >
                        ← Previous
                    </button>
                    <span className="page-info-pro">Page {page + 1}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={last}
                        className="page-btn-pro"
                    >
                        Next →
                    </button>
                </div>
            </div>

            {/* Edit Modal */}
            {editingPost && (
                <EditFoodModal
                    post={editingPost}
                    onSave={handleUpdateComplete}
                    onClose={() => setEditingPost(null)}
                />
            )}
        </div>
    );
};

export default FoodPostList;
