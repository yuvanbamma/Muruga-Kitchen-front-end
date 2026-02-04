import { useState, useEffect, useCallback } from 'react';
import './FoodPostList.css';
import EditFoodModal from './EditFoodModal';

const FoodPostList = ({ onPostClick }) => {
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
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/food-posts?page=${page}&size=${pageSize}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch posts: ${response.status}`);
            }
            const data = await response.json();
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
        if (!window.confirm("Are you sure you want to delete this delicious dish?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-posts?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Also trigger re-fetch for safety, or keep local filter
                fetchPosts();
            } else {
                alert("Failed to delete. Please try again.");
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Network error while deleting.");
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
                    <button className="filter-chip active">Sort By: Recommended</button>
                    <button className="filter-chip">Rating 4.0+</button>
                    <button className="filter-chip">Pure Veg</button>
                    <button className="filter-chip">Price: Low to High</button>
                    <button className="filter-chip">Delivery Time</button>
                </div>
            </div>

            <div className="list-content-area">
                <h2 className="feed-title">{loading ? 'Hunting for food...' : 'Order food online'}</h2>

                {error && <div className="error-message-modern">⚠️ {error}</div>}

                <div className="food-grid-pro">
                    {loading ? (
                        Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        posts.map(post => {
                            // Helper to find the ID if the field name varies
                            const postId = post.id || post.uuid || post.foodPostId || post.postId;

                            return (
                                <div
                                    key={postId || Math.random()}
                                    className="food-card-pro"
                                    onClick={() => postId && onPostClick(postId)}
                                >
                                    <div className="card-media">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.VITE_API_URL}${post.imageUrl}`}
                                                alt={post.name}
                                                className="card-img"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/300x200?text=Delicious';
                                                }}
                                            />
                                        ) : (
                                            <div className="no-image-placeholder">🍽️</div>
                                        )}

                                        {/* Management Overlay */}
                                        <div className="card-management-tools">
                                            <button className="tool-btn edit" onClick={(e) => handleEditClick(e, post)} title="Edit Dish">✎</button>
                                            <button className="tool-btn delete" onClick={(e) => handleDelete(e, postId)} title="Delete Dish">🗑</button>
                                        </div>

                                        <div className="promoted-badge">Promoted</div>
                                        <div className="time-badge">35 mins</div>
                                    </div>
                                    <div className="card-details">
                                        <div className="card-header-row">
                                            <h3 className="dish-name">{post.name}</h3>
                                            <div className="rating-badge">
                                                4.2 <span className="star">★</span>
                                            </div>
                                        </div>

                                        <div className="card-meta-row">
                                            <span className="cuisine-tag">{post.description ? post.description.substring(0, 25) + '...' : 'Indian • Fast Food'}</span>
                                            <span className="price-estimate">₹{(post.quantity || 1) * 150} for two</span>
                                        </div>

                                        <div className="card-divider"></div>

                                        <div className="card-footer-row">
                                            <span className="trend-icon">📈</span>
                                            <span className="trend-text">120+ orders placed recently</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {!loading && posts.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">🍳</div>
                        <h3>No dishes found</h3>
                        <p>Try resetting filters or check back later.</p>
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
