import { useState, useEffect } from 'react';
import './FoodPostList.css';

const FoodPostList = ({ onPostClick }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [last, setLast] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const pageSize = 12; // Grid view needs more items

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                // Determine if we need to search or just list (removed dummy search logic for now)
                const response = await fetch(`/api/food-posts?page=${page}&size=${pageSize}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data.content);
                setTotalPages(data.totalPages);
                setLast(data.last);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

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
                                    onClick={() => {
                                        console.log("Clicked post:", post);
                                        if (postId) {
                                            onPostClick && onPostClick(postId);
                                        } else {
                                            console.error("Critical Error: Could not find an ID in post object:", post);
                                            alert("Error: Cannot open details because Post ID is missing. Check console.");
                                        }
                                    }}
                                >
                                    <div className="card-media">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
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

                {/* Pagination */}
                <div className="pagination-pro">
                    <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0 || loading}
                        className="page-btn-pro"
                    >
                        ← Previous
                    </button>
                    <span className="page-info-pro">Page {page + 1}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={last || loading}
                        className="page-btn-pro"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodPostList;
