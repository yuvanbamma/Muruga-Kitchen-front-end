import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './FoodPostList.css';

const FoodPostList = ({ isOrphanageView = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 12;
  const pageTitle = isOrphanageView ? 'My requirements' : 'Requirements';

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const body = isOrphanageView && user?.orphanageId ? { orphanageId: user.orphanageId } : {};
      const data = await api.post(`/food-posts/getFoodPostList?page=${page}&size=${pageSize}`, body);
      setPosts(data.content);
      setTotalPages(data.totalPages);
      setLast(data.last);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, isOrphanageView, user]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Remove this requirement?')) return;
    try {
      await api.delete(`/food-posts?id=${id}`);
      fetchPosts();
    } catch (err) {
      alert(err.message || 'Failed to delete.');
    }
  };

  const SkeletonCard = () => (
    <div className="post-card skeleton">
      <div className="post-card-img" />
      <div className="post-card-body">
        <div className="post-card-title" />
        <div className="post-card-meta" />
        <div className="post-card-progress" />
      </div>
    </div>
  );

  return (
    <div className="post-list">
      <div className="post-list-header">
        <h1>{loading ? 'Loading...' : pageTitle}</h1>
        {isOrphanageView && (
          <button className="btn-primary" onClick={() => navigate('/create')}>+ Post</button>
        )}
      </div>
      {error && <div className="post-list-error">{error}</div>}
      <div className="post-grid">
        {loading ? (
          Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          posts.map(post => {
            const postId = post.id || post.uuid || post.foodPostId || post.postId;
            const progress = Math.min(100, Math.round((post.collectedQuantity || 0) / (post.quantityRequired || 1) * 100));
            const distanceKm = typeof post.distance === 'number' ? post.distance : null;
            return (
              <article
                key={postId || Math.random()}
                className="post-card"
                onClick={() => postId && navigate(`/post/${postId}`)}
              >
                <div className="post-card-img-wrap">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl.startsWith('http') ? post.imageUrl : `${import.meta.env.VITE_API_URL}${post.imageUrl}`}
                      alt={post.name}
                      onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x240?text=Need'; }}
                    />
                  ) : (
                    <div className="post-card-placeholder">Need</div>
                  )}
                  <span className="post-card-badge">Goal: {post.quantityRequired || 0}</span>
                </div>
                <div className="post-card-body">
                  <h3>{post.name}</h3>
                  {distanceKm != null && (
                    <div className="post-card-distance">
                      {distanceKm.toFixed(1)} km away
                    </div>
                  )}
                  <p>{post.requirement ? post.requirement.substring(0, 60) + (post.requirement.length > 60 ? '…' : '') : 'Support needed'}</p>
                  <div className="post-card-progress-wrap">
                    <div className="post-card-progress-bar"><div style={{ width: `${progress}%` }} /></div>
                    <span className="post-card-progress-text">{post.collectedQuantity || 0} / {post.quantityRequired || 0}</span>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
      {!loading && posts.length === 0 && (
        <div className="post-list-empty">
          <p>No requirements yet.</p>
        </div>
      )}
      {!loading && posts.length > 0 && (
        <div className="post-pagination">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="btn-secondary">Previous</button>
          <span>Page {page + 1}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={last} className="btn-secondary">Next</button>
        </div>
      )}
    </div>
  );
};

export default FoodPostList;
